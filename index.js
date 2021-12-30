import jwt from 'njwt';
import crypto from 'crypto';

const secretKey = 'B+HbJGA6Ow4WU3MyOhPrN3+uq77leGv0+YFef7/akGuwfQN4vxoh18ccw+nsEecOg16mUn4tPFkgXHSaz+Ovf/1stvGkEmuORYozdAR6G8DTlEB9RhOXO2MLpw76qtvGNhVselhRUhNpknjaBxXtDQCax10lf0qcTCNZeLdjb1KK76I7LaxiF6FmgiYTdvqQOy3SI1s4+2EgsEm32Tquj7dHugEaYQP1VGZrHISzZ97pdxkBJzmEWrzl4qxpnAJU3epByWuJi1VAiWMsepT3sx2q6OgKRGB4ptJm5PvQmL5A4oPn3Qe1N32cW2Z9KZVK5F5s11PHLi/Ssr07g3akvQ==';

function generateToken() {
    const claims = {
        //api: ['public-facilities', 'inventory-management']
        api: ['json-storage']
    };
    
    const token = jwt.create(claims, secretKey);
    const expires = new Date().getTime() + (48*60*60*1000);  // Set for 2 days
    token.setExpiration(expires); 
    
    console.log(token.compact());
}

function createSecretKey() {
    const mySecret = crypto.randomBytes(256).toString('base64');
    console.log(mySecret);
}

//createSecretKey();
generateToken();