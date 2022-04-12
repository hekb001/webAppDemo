import React from "react";
import classNames from "classnames";
import "./index.less";

export default (props) => {
  const {
    prefixCls = "j-card",
    className,
    radioButtonWarp,
    extra,
    bodyStyle,
    title,
    loading,
    bordered = true,
    ...others
  } = props;
  let children = props.children;
  const classString = classNames(prefixCls, className, {
    [`${prefixCls}-loading`]: loading,
    [`${prefixCls}-bordered`]: bordered,
  });

  let radioButton = !radioButtonWarp ? "" : radioButtonWarp;

  if (loading) {
    children = (
      <div>
        <p className={`${prefixCls}-loading-block`} style={{ width: "94%" }} />
        <p>
          <span
            className={`${prefixCls}-loading-block`}
            style={{ width: "28%" }}
          />
          <span
            className={`${prefixCls}-loading-block`}
            style={{ width: "62%" }}
          />
        </p>
        <p>
          <span
            className={`${prefixCls}-loading-block`}
            style={{ width: "22%" }}
          />
          <span
            className={`${prefixCls}-loading-block`}
            style={{ width: "66%" }}
          />
        </p>
        <p>
          <span
            className={`${prefixCls}-loading-block`}
            style={{ width: "56%" }}
          />
          <span
            className={`${prefixCls}-loading-block`}
            style={{ width: "39%" }}
          />
        </p>
        <p>
          <span
            className={`${prefixCls}-loading-block`}
            style={{ width: "21%" }}
          />
          <span
            className={`${prefixCls}-loading-block`}
            style={{ width: "15%" }}
          />
          <span
            className={`${prefixCls}-loading-block`}
            style={{ width: "40%" }}
          />
        </p>
      </div>
    );
  }

  let head;
  if (!title) {
    head = null;
  } else {
    head =
      typeof title === "string" ? (
        <div className={`${prefixCls}-head`}>
          <h3 className={`${prefixCls}-head-title`}>{title}</h3>
          {extra ? <div className={`${prefixCls}-extra`}>{extra}</div> : null}
        </div>
      ) : (
        <div className={`${prefixCls}-head`}>
          <div className={`${prefixCls}-head-title`}>{title}</div>
          {extra ? <div className={`${prefixCls}-extra`}>{extra}</div> : null}
        </div>
      );
  }
  return (
    <div {...others} className={`${classString} mainContent`}>
      {head}
      <div className={`${prefixCls}-body ${radioButton}`} style={bodyStyle}>
        {children}
      </div>
    </div>
  );
};
