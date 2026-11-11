export function SearchForm({ tenant, values }: { tenant: string; values: Record<string, string | undefined> }) {
  return (
    <form className="search" method="get">
      <input type="hidden" name="tenant" value={tenant} />
      <label>
        APN
        <input name="apn" defaultValue={values.apn ?? ""} />
      </label>
      <label>
        Address
        <input name="address" defaultValue={values.address ?? ""} />
      </label>
      <label>
        Owner
        <input name="owner" defaultValue={values.owner ?? ""} />
      </label>
      <label>
        Tier
        <select name="tier" defaultValue={values.tier ?? ""}>
          <option value="">Any</option>
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
          <option value="D">D</option>
        </select>
      </label>
      <button type="submit">Search</button>
      <a href={`/?tenant=${tenant}`}>Clear</a>
    </form>
  );
}
