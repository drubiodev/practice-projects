INSERT INTO dbo.Employees
    (FirstName,LastName,EmailAddress,PayRate,BillRate)
VALUES
    ('Daniel', 'Rubio', 'dr@dr.com', '100', DEFAULT),
    ('Joe', 'Smith', 'JoeSmith@smith.com', '125', '175'),
    ('Sue', 'Storm', 'Sue@storm.com', '150', '225')

INSERT INTO dbo.Customers
    (CompanyName,PhoneNumber,EmailAddress)
VALUES
    ('XYZ Corp', '555-555-5555', 'hr@xyz.org'),
    ('Acme Inc', '555-555-1234', 'buggs@acme.org'),
    ('ABC Incorporated', '555-123-1234', 'ceo@abc.net')

INSERT INTO dbo.Jobs
    (JobName,CustomerId)
VALUES
    ('Create Time Sheet', 2),
    ('Build Building', 3),
    ('Mow Lawn', 2)

INSERT INTO dbo.Locations
    (StreetAddress,City,[State],Zipcode,CustomerId)
VALUES
    ('123 West St.', 'Scranton', 'PA', '18512', 2),
    ('101 Main Ave.', 'Washington', 'DC', '10042', 3),
    ('19 W Holly St.', 'DuBois', 'TX', '66598', 2)

INSERT INTO dbo.WorkDone
    (EmployeeId,JobId,LocationId,HoursWorked,[Description],DatePerformed)
VALUES
    (2, 1, 1, 7, 'I Created most of the backend DB to support timesheet app.', '1/15/2017'),
    (2, 1, 3, 3, 'Built VueJs Frontend.', '1/18/2017'),
    (4, 2, 2, 9, 'Built first floor.', '1/8/2017')

