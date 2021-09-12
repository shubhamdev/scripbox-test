import React, { useEffect, useState } from "react";
import {
  Button,
  Row,
  Col,
  Dropdown,
  Menu,
  Skeleton,
  message,
  Empty,
  Tag,
  Tooltip,
  Comment,
  Avatar,
} from "antd";
import { List, Card, Divider } from "antd";
import { LikeOutlined, DownOutlined } from "@ant-design/icons";
import { formateDate, sortData } from "../../utils/service";
import { readCollection, updateCollection } from "../../utils/api";
import { isLogin } from "../../utils";

function DashboardPage() {
  // dashboard list from firebase
  const [dashboardList, setDashboardList] = useState([]);
  // isLoading flag
  const [isLoading, setIsLoading] = useState(true);
  // Display test for sort order
  const [sortOrder, setSortOrder] = useState("Sort By");
  // User details object
  const [loginUserName, setLoginUserName] = useState("");

  const sortDashboardData = ({ key }) => {
    setSortOrder(key);
    switch (key) {
      case "date":
        {
          const a = [...dashboardList];
          const data = sortData(a, "createdDate", "ASC"); // sortListWithDate(a);
          setDashboardList(data);
        }
        break;
      case "upVote":
        {
          const a = [...dashboardList];
          const data = sortData(a, "upVote", "ASC");
          setDashboardList(data);
        }
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    // Set login user details
    if (isLogin()) {
      setLoginUserName(JSON.parse(localStorage.getItem("jwt")));
      // Load data from firebase API
      readCollection("challenges")
        .then((data) => {
          setIsLoading(false);
          setDashboardList(data);
        })
        .catch((error) => {
          message.error(
            "Something went wrong please try again. Error: " + error
          );
          setIsLoading(false);
          setDashboardList([]);
        });
    }
  }, []);

  const menu = () => (
    <Menu onClick={sortDashboardData}>
      <Menu.Item id="data" key="date">
        Date
      </Menu.Item>
      <Menu.Item id="upVote" key="upVote">
        up vote{" "}
      </Menu.Item>
    </Menu>
  );

  const incrementUpVote = (dashboardItem) => {
    if (
      dashboardItem.createdBy.toLowerCase() !==
      loginUserName.user.name.toLowerCase()
    ) {
      const count = dashboardItem.upVote.filter(
        (item) => item.toLowerCase() === loginUserName.user.name.toLowerCase()
      );

      if (count && count.length === 0) {
        const copyDashboardList = [...dashboardList];
        let updatedResult = dashboardItem.upVote;
        updatedResult = updatedResult.push(loginUserName.user.name);
        copyDashboardList.map((item) => {
          if (item.id === dashboardItem.id) {
            item.upVote = dashboardItem.upVote;
          }
          return item;
        });
        updateCollection(
          dashboardItem.id,
          dashboardItem.upVote,
          "upVote",
          "challenges"
        )
          .then((data) => {})
          .catch((error) => {});
        message.success("updated successfully");
        setDashboardList(copyDashboardList);
      } else {
        message.error("Sorry");
      }
    }
  };

  return (
    <div className="site-card-wrapper">
      <Row>
        <Col offset={2} span={20}>
          <Divider orientation="center">
            Hackathon Challenges
            <Divider orientation="end">
              {dashboardList && dashboardList.length > 0 ? (
                <Dropdown overlay={menu}>
                  <a
                    className="ant-dropdown-link"
                    onClick={(e) => e.preventDefault()}
                  >
                    {sortOrder} <DownOutlined />
                  </a>
                </Dropdown>
              ) : isLoading ? (
                ""
              ) : (
                <Empty />
              )}
            </Divider>
          </Divider>

          <List
            size="small"
            loading={isLoading}
            bordered={true}
            grid={{ gutter: 10, column: 3 }}
            dataSource={dashboardList}
            renderItem={(item) => (
              <List.Item key={item.title}>
                <Card
                  size="small"
                  bordered={true}
                  title={item.title}
                  style={{ width: "300", color: "grey" }}
                >
                  <p>{item.description}</p>
                  <Tag>{item.tag}</Tag>
                  <Comment
                    // actions={actions}
                    author={<a>{item.createdBy}</a>}
                    avatar={
                      <Avatar
                        src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                        alt="Han Solo"
                      />
                    }
                    content={<p>{formateDate(item.createdDate)}</p>}
                    datetime={
                      <Tooltip title="">
                        <span></span>
                      </Tooltip>
                    }
                  />
                  {/* <p>
                    <span>
                      CreatedBy:- {item.createdBy}
                      Date:- {formateDate(item.createdDate)}
                    </span>

                    <Tag>{item.tag.toUpperCase()}</Tag>
                  </p> */}
                  <Button
                    type="link"
                    shape="circle"
                    icon={<LikeOutlined />}
                    size={2}
                    onClick={() => incrementUpVote(item)}
                  >
                    {" " + item.upVote.length}
                  </Button>
                </Card>
              </List.Item>
            )}
          >
            <Skeleton loading={isLoading} avatar active></Skeleton>
          </List>
        </Col>
      </Row>
    </div>
  );
}

export default DashboardPage;
