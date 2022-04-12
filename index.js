import jwt from 'njwt';
import crypto from 'crypto';

//const secretKey = 'B+HbJGA6Ow4WU3MyOhPrN3+uq77leGv0+YFef7/akGuwfQN4vxoh18ccw+nsEecOg16mUn4tPFkgXHSaz+Ovf/1stvGkEmuORYozdAR6G8DTlEB9RhOXO2MLpw76qtvGNhVselhRUhNpknjaBxXtDQCax10lf0qcTCNZeLdjb1KK76I7LaxiF6FmgiYTdvqQOy3SI1s4+2EgsEm32Tquj7dHugEaYQP1VGZrHISzZ97pdxkBJzmEWrzl4qxpnAJU3epByWuJi1VAiWMsepT3sx2q6OgKRGB4ptJm5PvQmL5A4oPn3Qe1N32cW2Z9KZVK5F5s11PHLi/Ssr07g3akvQ==';
//const secretKey = 'erRvMQWvHYtS9buQoVsJP9h9V4cQnpFGnQnONtoFTd1oYt3hDRlVzNMftWiqOjNZt71pXPlhlJ2MS6UPgqFN+bPveT/mMPRND0p0kFiOaPMAwTuhFk8Ay+RmYBji46dbo6HrAEMoN+B+mha+okEtiV0PxP8X0xOr73cyEuWk9LDxytvNnyVObFu91P8Mgh71FzL/9aQmTHOoDUQA6rH/K7B6UQbXGAFcYdik61LY41TKVoo96rTjoSNNLckQDFcpRrZsFFIqz40AnE3w3mNurhIp7aQx75VCnLCaJeoWWctKGrySYu2KFi1yYuJrRYER8BAVk8OXCqQkzKXKNPTngw==';
//const secretKey = 'DVv1LFZ3eUBJY8sYKyjcp+hW55eSK29SKhmBLr+Is+XiQM8lhEeYlKzS2zKZ3wgirt40V9LMxV3IF2zcncwqYhHV2o1irbAD4E+zGsO6+1EcXE1p/pjbUn3UddRPlFnSYkZa9Gkssv9HTt1OVHxkSEsj6qcyxEcBXFopsMXGMqE4zHqcTSmXYiJd5sMHdAisQBPnE5KukC/U/QE//q4Fbi9pE3Rime1wHR4zkp8yOH1IXkx4thPdxmYVJr77zESj81jGWybp5jengwpr55FVCzli8s3VN0eZhdICV7/xFTBo46DfqC2IySVA+QRmzs9fg0S6racaSVLQOFd07ANm2A==';
//const secretKey = '8POltos3MqfIzBhuymPjN8sQPMarV/M5f5fpbHQ00/PxTQzof8my2P9qkf080uMJxSQXUVGDKky5LjMIIIFXm4Q0SfY7qJAoJmwVVmVA6et6zXBUo00I/rAa8u0w48trAYbWQrph16VbADd5khsX2Q5HQpaaKXH/Npw6o3t/KmDqBCTYTShMDzDTCyDV7NouLD6gE6qyHHwRKLfWAy/VeKszPoxBUvailV73K0uiK00NkChIXDQ6Z+JC4+ABYnan2JPi/8GzVkaIrqI6vW4lw+TOGpLYYIP786rFlLPWHaVC16lgwil1BO0lMFJWi7r9/WxJ7EewOdW5kXXnqvwoLA==';
//const secretKey = 'wIQOSWRH2e5vQcRuWrso/rmiTR60eDHmnwt+t4AYjgjF5lsbyuejxBj4jqYWQwK8QCNFHgd1wKHJC7icu4fDhBiYRWK0JqZHHaguOYhDiu1XtdivKHszA1p+yVoedqSUDdw8NNiWrXH2HCmgVyO9XZ2ijIZNr8W1wNL+ujWSBsDOHs3/6mGTITPT2wSEVpHDTdD5dvEIVmS18yHZCHZAoMkb+pEM90XEg/0tqSrHhqocNZH0dHHE32GUxtil7tQ0Ibpb2ffePbUs3D0hpP/THZxA9oA3mJyFPCj3vGncGhq/0SLA6q6VEMdhohgmiC2WsqSutfa79RjMqdDSiU3SFA==';
//const secretKey = 'Oheo5ilQZHTkwv5EZE/Gr9+PvRmNuxfWZL9S/ZpfFy1WVvEDdbPeOknsT+KXNgd0kYvA7VG1CoxmaBT3M3BIpPfpPiUfkuf+biO8Dr0Nc9NSEjrh665CJcE6xN8vxxjIDHRoGDLI/d5vQn40tMPnxZcwUqt1WMKU3EENPGI+w+3Z35EIiwHQiaCw9bFiBWAuYiSfAcs8aC/k3RGx8WNR5+MU8Gfx7gbVurhsxNT4ppeyjqJILnDG2CmMCL/Us1H+gxIyafMStEAsnCOUhCOC/cVInhojMVFWBEeiCakJg3Tho7CPuSf17GZVZUAKNIz71ySvt7ee1r2Qi7pe3mhLmg==';
//const secretKey = '8hcxBVVbDa4BeSSYFD9CiuRye1gk0AJ+ZprgDkoO0QK0QmLUl+UwLgSgRSckdCSbC9lqnwYsrqCCVJMgBYFG6XW5lFRJwIzDi44cJ0R6PTTmgYHaaX7qsID25CxlViTU96TWGu14Lm0P16oUPFkUUO+ohhW5ozQNRAMmJkoPOJHmbRRRKvqx8iT03KVqJyvycJQ5WvQ4SSK3QKXyzOZxhsABoCVZOZU8p0zfJlp2oC9wbVEDXmohOGYZ5XPwIkhUl/nL54B7DeN+SZAL+jALOB5P5rL137BTdW4dvHEHzNB5jMO8bt+UD42T1NMhQHiBXUUuhpGe6CeFjD7DNLs1SA==';
//const secretKey = 'NlFs1qQszfSiqQIX/Ab6UhGcPT7iecG44oNCpD27Ykn9MMXIcO9i9syTSh/7MaW8WiLcTwp7saiLq7FeDGhNUB2Yo5JnYrl6kqK0eY24jKhgLILDxiQf0KjG2OEZhyh1+LG6tS4o2wiSzQkXU04Lr7Q86/e1nYdbF8NM5j6ytGh3RXJKVOHgM9lehU4dTiKih3sv37uKKvLm6xsd6hssBUiZIc9td82t1HdHp5t9XWxlUdILVAZvgB6YMZpPpcaJivRTNZ2EfOCBtUSI4DQTnwZV8hDz/HULCQYfI6thzPbe40JtsT8EIq+jLCiL5qnDcvu0fJnbX4vh5g1srp8Hjw==';
const secretKey = 'F7dt65b/01WDrv1aHTfQvie8D+blqObHLReCXEa8KSQrseOlJwBtdgIHQu8L5dj30dXlmyhhb6CTy0LyeoO6lVPKj4vzRxilXnr4AWcjRIbSe+VedF5SNYd5AQTz99ekZ+bVLZHXKCaEz/j/qoUxq3vloGmekf6h8BHXSjRF1L3z85avQ9EoVTGjdV4N/SLzUqN0HXzivrpHoh0IsVdf+93MltL5zaB5QCc8mIkxmrfoHjrOJyAm4yv/P3UYSpAO5aHus8vbvDUCNusX/HdVv1347/HQa3qK+kyLbg+CMrYbHJx5/f5prmHDtJh61ECHeNGHDBx9jafDEjFBXIqYag==';
const tenantId = '5078b0a8-bcc4-4a34-a312-e4257a589393';

const secondTenantSecretKey = 'QqUYA6cbwXQBjCRCWJPiY7e/ub1AV6kP7aG9LaWCuXP/Q/p4hgjcDrN7ianozigjLPujcJt+vd6Hj+b/L0yCOGghxEwdy7POy0iIjHl1tcapO3sHa9HTwNL43I71rZkQfmBiSEFVljRrg7yeaIaxr0JDxv0nGxQafaRM9/lJK6xsmAILEnmJWbvnW5vQ63Qw9Qy7feZgd0ljuhyZWCQGJD8EzhrBodtTw01SKnHhfwc4LZkpmIy0KvAXm4xSObg87ge9WI2FWnYxSWNvOV+CJ/hYmrc4+z9Mrvxo/BDgfu5gn/s6LRQcuuaSJ7v5i3StiAAVwe8NTSRCnwpFxuNXhQ==';
const secondTenantId = '2d47c0e4-5d8a-43fe-9307-9454facd0bb3';

const experimentalServerCourtWizardTenantSecretKey = 'jRhL40HyzBpY3DbsNbFNO1K1AHoqFrgQ7plspdoKk70omhtPjHWEkgsXy+fsJUnR327yRCjGkWASSOA/vFM0xrOSkay2UQ+2+OgiLXIXN0wTcBF1dmbWSzmcVioWvalrjKeiOOXYsQ2j60bGTb/oQ7lZy1f0RZtfcfdjAvQJ/Ym4ku/QtfIZcw2qOCUx4jRVXi8ndH5GuISwb5rQh6JgOTC9i2yYj+QcguKjEf2dGdN96pQtOLkNGes2y2mIByhdbgFPC4m269CdMhEGV6s4P7SnXh1NKRRdQNIXLO4tIcrhLuHe2yXTEnfMnsddI8CSKqZylZqQM3L2kUAAB++yhg==';
const experimentalServerCourtWizardTenantId = '98151aef-c354-4696-bb59-9959c1f0c24b';

const experimentalServerShareTenantId = '9c373289-bf25-4a36-b892-96efbe083c75';
const experimentalServerShareTenantSecretKey = 'fY7//2Le2UMFqvMbtAnfBSdsO0nhtLC3t/RSzywTOPkgFmXJP1+idXcxUnKfN2TgZrsEF0mIqGh1N39SgZeS+BCzhP9h3vY7xMGBStrpy/gbV+w/img7GaYYAeWkD+5EiptJSdVjFrjPUCNIUXgNKn3LbxHEiklLWjA5qlQIydjYgTF3m56WovGuE2HB/Dkokw9L6q4LpW+nUEqBM/hQg+M6e+YnWbW1M/9nPgrN/8hu3qlLYNNA9Yx74LvIkhEiDF5SDPxSP9L27NZLFPdp0rgSJXephK6ZICUoXT3XprC+9Iydk6Wf8fp55Oj6wrZxVJxdUsEEd0Dp4YT+wYmwHw==';

function generatePersonalToken() {
    /*const claims = {
        //api: ['public-facilities', 'inventory-management']
        //api: ['dbs', 'fbs']
        api: ['dbs.get', 'dbs.patch:{only:[status,occupiedBy]}', 'dbs.post', 'dbs.put'],
        expires: 2, issfor: '5078b0a8-bcc4-4a34-a312-e4257a589393'
        //api: ['dbs.get', 'dbs.patch:{only:[status,location]}']
    };*/

    const claims = {
        //api: ['public-facilities', 'inventory-management']
        //api: ['dbs', 'fbs']
        shareToken: false,
        api: ['dbs.get', 'dbs.patch:{only:[status,occupiedBy]}', 'dbs.post', 'dbs.put'],
        expires: 2,

        //api: ['dbs.get', 'dbs.patch:{only:[status,location]}']
    };
    
    const token = jwt.create(claims, experimentalServerCourtWizardTenantSecretKey);
    //const expires = new Date().getTime() + (48*60*60*1000);  // Set for 2 days
    //token.setExpiration(expires); 
    
    console.log(token.compact());
}


function generateShareToken() {
    const claims = {
        //api: ['public-facilities', 'inventory-management']
        //api: ['dbs', 'fbs']
        tenantId: experimentalServerCourtWizardTenantId,
        api: ['dbs.get', 'dbs.patch:{only:[status,occupiedBy]}', 'dbs.post', 'dbs.put'],
        expires: 72, 
        issfor: experimentalServerShareTenantId,
        requestLimit: 65
        //api: ['dbs.get', 'dbs.patch:{only:[status,location]}']
    };
    
    const token = jwt.create(claims, experimentalServerCourtWizardTenantSecretKey);
    console.log(token.compact());
}


function createSecretKey() {
    const mySecret = crypto.randomBytes(256).toString('base64');
    console.log(mySecret);
}

//createSecretKey();
//generatePersonalToken();
generateShareToken();