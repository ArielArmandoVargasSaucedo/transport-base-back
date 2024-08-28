import { DriverSerializable } from "src/driver/serializable/driver.serializable";
import { Role } from "src/role/entities/role.entity";

export class UserSerializable {
    id_aut_user: number;
    user_name: string;
    email: string
    role: Role; // debería ser serializable
    driver?: DriverSerializable;

    constructor(id_aut_user: number,
        user_name: string,
        email: string,
        role: Role, // debería ser serializable
        driver?: DriverSerializable) {
        this.id_aut_user = id_aut_user
        this.user_name = user_name
        this.email = email
        this.role = role
        this.driver = driver
    }
}