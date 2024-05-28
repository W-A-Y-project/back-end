CREATE TABLE User (
    CPF CHAR(11) PRIMARY KEY NOT NULL,
    FullName VARCHAR(50) NOT NULL,
    Email VARCHAR(100) NOT NULL,
    Password NVARCHAR(20) NOT NULL CHECK (CHAR_LENGTH(Password) >= 8 AND CHAR_LENGTH(Password) <= 20),
    Phone VARCHAR(11) NOT NULL,
    City VARCHAR(30) NOT NULL,
    State VARCHAR(30) NOT NULL,
    PostalCode CHAR(8) NOT NULL
);
