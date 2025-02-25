import React from 'react'
import styles from './homepage.module.css'
function HomePage () {
  return (
    <>
      <h2 className={styles.h2}>
        Opioid Agonist/Antagonist Knowledgebase
      </h2>
      <img src={require('../../home.png')} alt="home" className={styles.img} />
      <div className={styles.message}>
        {`
            Opioid agonist/antagonist knowledgebase (OAK) is developed to help review and development of 
            analgesic products for pain management and opioid use disorder treatment. 
            The OAK database mainly contains experimental data on opioid agonist/antagonist activity curated from multiple public 
            databases such as PubChem, ChEMBL, and BindingDB.
            `}

      </div>
    </>
  )
}

export default HomePage