import { Users } from "../models"
import { commonModule } from "./../utils/common"

export const UserController = {

    fetchDataFRomDb: async (page: Number, limit: Number) => {

        // get calculated paginate values
        let getPaginateData = await commonModule.getPagination(page, limit)

        // query database
        let data =  await Users.find({}).skip(getPaginateData.offset).limit(getPaginateData.climit + 1)

        // return data
        if (data && data.length > getPaginateData.climit) {
            data.pop()
            return { data: data, nextPage: Number(page) + 1, }
        }
        else {
            return { data: data, nextPage: -1 }
        }
    }
}