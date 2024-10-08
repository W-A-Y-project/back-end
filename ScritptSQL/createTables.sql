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

CREATE TABLE DISAPPEARED (
    CPF VARCHAR(11) NOT NULL PRIMARY KEY,
    FULL_NAME VARCHAR(255) NOT NULL,
    BIRTH_DATE DATE NOT NULL,
    GENDER ENUM('Masculino', 'Feminino') NOT NULL,
    LAST_SEEN_LOCATION VARCHAR(255) NOT NULL,
    LAST_SEEN_DATE DATE NOT NULL,
    HOME_ADDRESS VARCHAR(255) NOT NULL,
    SKIN_COLOR VARCHAR(50) NOT NULL,
    EYE_COLOR VARCHAR(50) NOT NULL,
    CHARACTERISTICS TEXT,
    HAIR VARCHAR(100) NOT NULL,
    ILLNESS BOOLEAN NOT NULL,
    ILLNESS_DESCRIPTION TEXT, -- FILLED ONLY IF 'ILLNESS' IS TRUE
    CLOTHING_WORN TEXT,
    VEHICLE BOOLEAN NOT NULL,
    VEHICLE_DESCRIPTION TEXT -- FILLED ONLY IF 'VEHICLE' IS TRUE
    BO_DOCUMENT BLOB NOT NULL,  
    BO_VERIFIED ENUM('True', 'False', 'Pending') DEFAULT 'Pending'

    ALTER TABLE DISAPPEARED
    ADD Photo BLOB;
);

