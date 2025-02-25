import React from 'react'
import styles from './predictpage.module.css'
function PredictPage () {
  return (
    <>
      <h2 className={styles.h2}>
        Opioid Prediction Model
      </h2>
      <img src={require('../../model.png')} alt="model" className={styles.img} />
      <div className={styles.message}>
        {`
             The prediction model is designed to determine the agonist/antagonist properties for each opioid receptor: agonist, partial agonist and antagonist. The model will be generated based on descriptors from both structure-based and ligand-based methods.
             The prediction model defines a mathematical transformation between the independent variables (chemical structure descriptors) and the dependent variable (biological endpoint). Qualitative models are trained to predict the dependent variable on a categorical scale such as biologically active or inactive. A quantitative model transforms the values of independent variables used in the model to a value on a continuous scale of the bioactivity. 

            `}
      </div>
    </>
  )
}

export default PredictPage