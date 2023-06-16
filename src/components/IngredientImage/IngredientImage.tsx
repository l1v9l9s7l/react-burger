import React from "react";
import PropTypes from "prop-types";
import { CSSProperties } from "react";

import styles from "./IngredientImage.module.css";

const IngredientImage = ({ image, count, name, mix }: {image: string, count?: number, name: string, mix?: CSSProperties | undefined}) => {
  return (
    <div className={`${styles.Container}`} style={mix}>
      <div className={styles.BordersContainer}>
        <img className={styles.Image} src={image} alt={name} />
      </div>
      {count && (
        <>
          <div className={styles.NumberBackground}>
            <p className={`text text_type_main-default`}>+{count}</p>
          </div>
        </>
      )}
    </div>
  );
};

IngredientImage.propTypes = {
  image: PropTypes.string.isRequired,
  count: PropTypes.number,
  name: PropTypes.string.isRequired,
  mix: PropTypes.object,
};

export default IngredientImage;
