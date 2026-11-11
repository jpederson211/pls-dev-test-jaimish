# PLS-PROP-001: Properties list

**Status:** Ready
**Screen:** Properties (list) with preview panel
**Workstream:** record

## What this screen is for

The Properties screen is where a broker or ISA finds a building and sees, at a glance, when the team last contacted it. It lists every property in the signed-in tenant. Clicking a row opens a preview panel on the right.

## Behavior

- The page shows a breadcrumb ("Properties"), not a page title.
- Four search fields, in this order: **APN**, **Address**, **Owner**, **Tier**.
  - APN matches from the start of the APN.
  - Address matches any part of the address.
  - Owner matches any part of the owner's name, in any case.
  - Tier is a dropdown: Any, A, B, C, D.
  - Fields combine. A search for Owner "trust" and Tier "A" shows only Tier A properties whose owner name contains "trust".
- The **Search** button applies the fields. The **Clear** link resets all fields and sorting.
- Table columns, in this order: **APN**, **Address**, **Owner**, **Units**, **Tier**, **Last touch**.
- **Tier** and **Last touch** are sortable. Clicking a header sorts ascending; clicking again sorts descending. The active sort shows an arrow.
- Last touch shows the date of the most recent touch, or "Never".
- Clicking a row opens the **preview panel**, which shows:
  - address, city, ZIP, APN, and owner
  - **touches from the last 90 days**, newest first
  - **campaign history**: every campaign the property was added to, newest first

## Acceptance tests

1. The four search fields appear in the order APN, Address, Owner, Tier. Search applies them; Clear resets them.
2. APN is the first column, and the columns appear in the order APN, Address, Owner, Units, Tier, Last touch.
3. Clicking Tier sorts A to D; clicking again sorts D to A.
4. Clicking Last touch sorts oldest to newest; clicking again sorts newest to oldest. In both directions, properties that have never been touched appear at the bottom of the list.
5. An Owner search matches part of the owner's name in any case ("SMITH", "smith" and "mith" find "Smith Family Trust") and can be combined with the other fields.
6. Clicking a row opens the preview panel. It shows only touches from the last 90 days, newest first, and the property's campaign history.
