import React from "react";
import PropTypes from 'prop-types';

import styles from './ingredient-image.module.css';

const IngredientImage = ({ image, count, name, mix}) => {
    return (
        <div className={`${styles.Container}`} style={mix}>
            <div className={styles.BordersContainer}>
                <img className={styles.Image} src={image} alt={name}/>
            </div>
            {count && (
                <>
                    <div className={styles.NumberBackground}>
                        <p className={`text text_type_main-default`}>+{count}</p>
                    </div>
                </>
            )}
        </div>
    )
}

IngredientImage.propTypes = {
    image: PropTypes.string.isRequired,
    count: PropTypes.number,
    name: PropTypes.string.isRequired,
    mix: PropTypes.object
}

export default IngredientImage;