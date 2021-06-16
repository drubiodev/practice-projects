-- CHAR(10) System places 10 spaces
-- NCHAR(10) System places 10 spaces and allows unicode
-- VARCHAR(10) places up to 10 (variable lenght)
-- NVARCHAR(10) places up to 10 (variable lenght) and allows unicode

CREATE TABLE Employees
(
    Id int IDENTITY NOT NULL PRIMARY KEY,
    FirstName VARCHAR(100) NOT NULL,
    LastName VARCHAR(100) NOT NULL,
    EmailAddress VARCHAR(100) NOT NULL,
    PayRate MONEY NOT NULL,
    BillRate MONEY NOT NULL DEFAULT 150,
    CreatedDate DATETIME2 DEFAULT GETUTCDATE(),
    LastUpdated DATETIME2 DEFAULT GETUTCDATE()
)

CREATE TABLE Customers
(
    Id INT IDENTITY NOT NULL PRIMARY KEY,
    CompanyName VARCHAR(100) NOT NULL,
    PhoneNumber VARCHAR(20) NOT NULL,
    EmailAddress VARCHAR(100) NOT NULL,
    CreatedDate DATETIME2 DEFAULT GETUTCDATE(),
    LastUpdated DATETIME2 DEFAULT GETUTCDATE()
)

CREATE TABLE Jobs
(
    Id int IDENTITY NOT NULL PRIMARY KEY,
    JobName VARCHAR(100) NOT NULL,
    CustomerId INT NOT NULL,
    CreatedDate DATETIME2 DEFAULT GETUTCDATE(),
    LastUpdated DATETIME2 DEFAULT GETUTCDATE(),
    CONSTRAINT FK_CustomerId_TBL_Jobs_TBL_CUSTOMERS FOREIGN KEY(CustomerId) REFERENCES Employees(Id)
)

CREATE TABLE Locations
(
    Id int IDENTITY NOT NULL PRIMARY KEY,
    StreetAddress VARCHAR(100) NOT NULL,
    City VARCHAR(50) NOT NULL,
    State VARCHAR(2) NOT NULL,
    ZipCode VARCHAR(20) NOT NULL,
    CustomerId INT NOT NULL,
    CreatedDate DATETIME2 DEFAULT GETUTCDATE(),
    LastUpdated DATETIME2 DEFAULT GETUTCDATE(),
    CONSTRAINT FK_CustomerId_TBL_Locations_TBL_CUSTOMERS FOREIGN KEY(CustomerId) REFERENCES Customers(Id)
)

CREATE TABLE WorkDone
(
    Id int IDENTITY NOT NULL PRIMARY KEY,
    EmployeeId INT NOT NULL,
    JobID INT NOT NULL,
    LocationID INT NOT NULL,
    HoursWorked INT NOT NULL DEFAULT 1,
    Description VARCHAR(2000) NOT NULL,
    DatePerformed DATE NOT NULL,
    CreatedDate DATETIME2 DEFAULT GETUTCDATE(),
    LastUpdated DATETIME2 DEFAULT GETUTCDATE(),
    CONSTRAINT FK_EmployeeId_TBL_WorkDone_TBL_Employees FOREIGN KEY(EmployeeId) REFERENCES Employees(Id),
    CONSTRAINT FK_JobID_TBL_WorkDone__TBL_Jobs FOREIGN KEY(JobID) REFERENCES Jobs(Id),
    CONSTRAINT FK_LocationID_TBL_WorkDone__TBL_Locations FOREIGN KEY(LocationID) REFERENCES Locations(Id)
)
