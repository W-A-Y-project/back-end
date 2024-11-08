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

ALTER TABLE User
ADD Photo BLOB;

ALTER TABLE User
CHANGE Password UserPassword VARCHAR(255) NOT NULL;

ALTER TABLE User
DROP CHECK User_chk_1;  //TALVEZ NAO PRECISE RODAR ISSO

CREATE TABLE Disappeared (
    CPF VARCHAR(11) NOT NULL PRIMARY KEY,
    Photo BLOB NOT NULL,
    FullName VARCHAR(255) NOT NULL,
    BirthDate DATE NOT NULL,
    Gender ENUM('Masculino', 'Feminino') NOT NULL,
    LastSeenLocation VARCHAR(255) NOT NULL,
    LastSeenDate DATE NOT NULL,
    City VARCHAR(30) NOT NULL,
    State VARCHAR(30) NOT NULL,
    PostalCode CHAR(8) NOT NULL, 
    SkinColor VARCHAR(50) NOT NULL,
    EyeColor VARCHAR(50) NOT NULL,
    Characteristics TEXT,
    Hair VARCHAR(100) NOT NULL,
    Illness BOOLEAN NOT NULL,
    IllnessDescription TEXT, 
    ClothingWorn TEXT,
    Vehicle BOOLEAN NOT NULL,
    VehicleDescription TEXT,
    BoDocument BLOB NOT NULL,  
    BoVerified ENUM('True', 'False', 'Pending') DEFAULT 'Pending'
);

