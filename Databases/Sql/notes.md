# Joins

**INNER JOIN**: only the records that match

**LEFT JOIN**: all records from left table and all matching from right table

**RIGHT JOIN**: all records from right table and all matching from left table

# Sample Queries

**Display Worked Done**
```sql
SELECT
	  E.FirstName + ' ' + E.LastName AS FullName
	, J.JobName
	, W.Description
	, W.HoursWorked
	, L.StreetAddress + ', ' + L.City  + ', ' + L.State + ' ' + L.ZipCode AS Location
	, C.CompanyName
FROM dbo.WorkDone W
INNER JOIN dbo.Employees E ON E.Id = W.EmployeeId
INNER JOIN dbo.Jobs J ON J.Id = W.JobID
INNER JOIN dbo.Locations L ON L.Id = W.LocationID
INNER JOIN dbo.Customers C ON C.Id = L.CustomerId
```

## Display Total Hours Worked By Company
```sql
SELECT
	  --E.FirstName
	 SUM(W.HoursWorked) AS 'Total Work'
	, C.CompanyName
	, MIN(W.HoursWorked) AS Minimum
	, MAX(W.HoursWorked) AS Maximum
	, AVG(W.HoursWorked) AS Average
	, COUNT(1) AS 'Number of Entries'
FROM dbo.WorkDone W
INNER JOIN dbo.Jobs J ON J.Id = W.JobID
INNER JOIN dbo.Customers C ON C.Id = J.CustomerId
INNER JOIN dbo.Employees E on E.Id = W.EmployeeId
--WHERE W.Id != 1
GROUP BY C.CompanyName
--HAVING SUM(W.HoursWorked) > 5
ORDER BY C.CompanyName
```