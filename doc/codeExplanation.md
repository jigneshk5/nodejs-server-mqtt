**Registration.js**

-   For adding a new field in the database

1.  With SQLite, we need to use [alter
    table](http://www.sqlite.org/lang_altertable.html) like:

    alter table user add column egdata varchar(50)

2.  Add this field(egdata) in the ‘records’ array defined on line-206 as:

    req.body.egdata

3.  Add this field in the sql query at line-215 as:

    INSERT INTO user

    (CustomerName,PHONE,EMAIL,ADDRESS,RFID,REG_NUM,VIN,MAC,
    VEHICLE_MAKE,FUEL_TYPE,IS_OBD,DateOfCreation,DateOfUpdation,

    FUEL_LEVEL,TANK_CAPACITY,RPM,SPEED,MAF,COOLANT_TEMP,MILAGE,OtherData1,OtherData2,
    egdata) VALUES\`+'('+placeholders+')'

4.  For the newly added field, we can add it as a query string (like
    <http://localhost:2000/api/registration?egdata=something>) in following way:

-   Add this field to the query array at line-16 as:

    req.query.egdata

-   Add this field to the getSqlQuery() defined at line-23 like:

    If(arr[i] == 22){ //egdata is the 23rd field to be added

    res[i] = ‘egdata’;

    }

-   Update the if-else at line 74 as:

    if(query[0] \|\| query[1] \|\| query[2] \|\| query[3]\|\| query[4] \|\|
    query[5]\|\|query[6] \|\| query[7] \|\| query[8] \|\| query[9] \|\|
    query[10] \|\| query[11] \|\| query[12] \|\| query[13] \|\| query[14] \|\|
    query[15] \|\| query[16]\|\| query[17]\|\| query[18]\|\| query[19] \|\|
    query[20] \|\| query[21] \|\| query[22])

**existingUser1.js**
