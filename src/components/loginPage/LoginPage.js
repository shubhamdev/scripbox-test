import React, { useContext, useEffect, useRef } from "react";
import { Form, Input, Button } from "antd";
import { Row, Col } from "antd";
import { login, isLogin } from "../../utils";
import { PageContext } from "../../PageContextProvider";
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 20 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const validateMessages = {
  required: "${label} is required!",
};

function LoginPage(props) {
  const inputRef = useRef(null);
  const { user } = useContext(PageContext);
  const onFinish = (value) => {
    login(value);
    user[1](value);
    props.history.push("/dashboard");
  };

  useEffect(() => {
    if (isLogin()) {
      props.history.push("/dashboard");
    } else {
      inputRef.current.focus();
    }
  }, []);

  return (
    <Row style={{ padding: "10%" }} justify="center">
      <h1 id="test">Login Form</h1>
      <Col span={12}>
        <Form
          {...layout}
          name="nest-messages"
          onFinish={onFinish}
          validateMessages={validateMessages}
        >
          <Form.Item
            name={["user", "name"]}
            label="User Name"
            rules={[{ required: true }]}
          >
            <Input
              ref={inputRef}
              type="text"
              name="username"
              autoComplete="off"
              placeholder="Enter e-mail and phone number"
            />
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button id="submit-id" type="primary" htmlType="submit">
              Login
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
}

export default LoginPage;
