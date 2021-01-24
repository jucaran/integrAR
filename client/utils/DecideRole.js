import React, { useContext } from "react";
import { Text } from "react-native";
import { AuthContext } from "../providers/AuthProvider";
import MyTabs from "../tabs/AdminTabs/Tab";
import CenterView from "./CenterView";

const DecideRole = () => {
  const { user } = useContext(AuthContext);

  switch (user?.role) {
    case "admin":
      return <MyTabs />;
    case "student":
      return <MyTabs />; //ACA DEBERIAMOS PONER LAS TABS PARA EL ALUMNO
    case "teacher":
      return <MyTabs />; //ACA DEBERIAMOS PONER LAS TABS PARA EL DOCENTE
    default:
      return (
        <CenterView>
          <Text>Ha ocurrido un error</Text>
        </CenterView>
      );
  }
};

export default DecideRole;
