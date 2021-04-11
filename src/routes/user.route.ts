import { UserController } from "../controllers";

var router = require('express').Router();


/* 
    route to get data from db with pagination
    1) if limit and page is provided it will return data according to that
    2) if limit and oage are not provided it take default values of page 1 and limit 10    
*/


router.get('/', async (req: any, res: any) => {
    try {
        let getData = await UserController.fetchDataFRomDb(req.query.page, req.query.limit)
        res.status(200).send({ "message": "Data fetched succesfully", getData })
    } catch (e) {
        res.status(500).send(e)
    }
  
});


module.exports = router;