import React , { useState } from "react";
// nodejs library that concatenates classes

import { TabContent, TabPane, Nav, NavItem, NavLink, Card,CardBody} from 'reactstrap';

import classnames from 'classnames';
import Wikidata from "components/Airport/Wikidata";
import Restricciones from "components/Airport/Restricciones";
import Comments from "components/Airport/Coments";

export default function CustomTabs(props) {
  const [activeTab, setActiveTab] = useState('1');

  const toggle = tab => {
    if(activeTab !== tab) setActiveTab(tab);
  }
  return (
    <div>
      <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '1' })}
            onClick={() => { toggle('1'); }}
          >
            Info
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '2' })}
            onClick={() => { toggle('2'); }}
          >
            Restricciones
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '3' })}
            onClick={() => { toggle('3'); }}
          >
            Comentarios
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <Card>
          <CardBody>
            <Wikidata airport={props.airport}/>
            </CardBody>
            </Card>
        </TabPane>
        <TabPane tabId="2">
        <Card>
          <CardBody>
            <Restricciones airport={props.airport}/>
            </CardBody>
            </Card>
        </TabPane>
        <TabPane tabId="3">
          <Card>
            <CardBody>
              <Comments airport={props.airport}/>
              </CardBody>
              </Card>
        </TabPane>
      </TabContent>
    </div>
  );

}
