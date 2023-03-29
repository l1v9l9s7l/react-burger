import React from "react";
import PropTypes from "prop-types";

const dicStatus = {
  done: {
    name: "Выполнен",
    color: "#00CCCC",
  },
  created: {
    name: "Выполнен",
    color: "#F2F2F3",
  },
  pending: {
    name: "Готовится",
    color: "#F2F2F3",
  },
};

const OrderStatus = ({ status, number, mix = "" }) => {
  const styledStatus = dicStatus[status];

  return (
    <>
      {number ? (
        <p
          className={`text text_type_digits-default pt-2 ${mix}`}
          style={{ color: styledStatus.color }}
        >
          {number}
        </p>
      ) : (
        <p
          className={`text text_type_main-small pt-2 ${mix}`}
          style={{ color: styledStatus.color }}
        >
          {styledStatus.name}
        </p>
      )}
    </>
  );
};

OrderStatus.propTypes = {
  status: PropTypes.string.isRequired,
  number: PropTypes.number,
  mix: PropTypes.string,
};

export default OrderStatus;
