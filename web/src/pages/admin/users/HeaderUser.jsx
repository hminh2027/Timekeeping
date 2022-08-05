import UseModal from "@/utils/hooks/UseModal";
import React from "react";
import Modal from "@/components/Common/Modal";
import CreateUser from "@/components/page/admin/users/FunctionUserModal";

const HeaderUser = ({ title}) => {
    const {isShowing, toggle} = UseModal();
    return (
        <div className="flex max-h-[56px] w-full items-center justify-between bg-white py-10">
            <div style={{ fontSize: "2em", fontWeight: "bolder" }}>{title}</div>
            <div className="flex justify-between">
                <button className="w-full rounded-lg border border-solid border-teal-700 px-3 bg-white p-1 text-black hover:bg-teal-700 hover:text-stone-100"
                 onClick={toggle}>
                     Create user
                </button> 
                    <Modal isShowing={isShowing} hide={toggle} closeButton={true}>
                        <CreateUser
                        hide={toggle}
                        userData= {{
                            lastName: "",
                            firstName: "",
                            email: "",
                            role: "",
                            password: "",
                        }}
                        Name= "CREATE"
                        click="CREATE"
                        />
                    </Modal>

            </div>
        </div>
    );
};

export default HeaderUser;