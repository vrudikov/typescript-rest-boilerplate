import {DELETE, GET, Path, PathParam, POST} from "typescript-rest";
import Admin, {AdminModel} from "../model/admin";

@Path('/hello-admins')
export class HelloAdminController {

    /**
     * Returns a list of admins
     * @return Array<AdminModel> admins list
     */
    @GET
    public getAllAdmins(): Promise<Array<AdminModel>> {
        return Admin.find({}).exec();
    }

    /**
     * Returns an admin
     * @param id admin identity
     * @return AdminModel single admin
     */
    @GET
    @Path(':id')
    public getAdmin(@PathParam('id') id: string): Promise<AdminModel> {
        return Admin.findById(id).exec();
    }

    /**
     * Creates an admin
     * @param newRecord admin data
     * @return AdminModel new admin
     */
    @POST
    public createAdmin(newRecord: AdminModel): Promise<AdminModel> {
        console.log(newRecord);
        return Admin.create(newRecord);
    }

    /**
     * Deletes an admin
     * @param id admin identity
     * @return AdminModel deleted admin
     */
    @DELETE
    @Path(':id')
    public deleteAdmin(@PathParam('id') id: string): Promise<AdminModel> {
        return Admin.findByIdAndRemove(id).exec();
    }
}
