import { Button, Modal } from 'antd'
import React, { useState } from 'react'

function StructureSearch () {

const [loading,setLoading] = useState(false)

const [visible,setVisible] = useState(false)

const showModal = () => {
    setVisible(true)
}

const searchKetcher = async(value) => {
        const response = await fetch(`http://localhost:5000/demosdf/${value}`)
        const jsonData = await response.json()
        console.log('search structure...')
        console.log(jsonData)
       
}



const loadKetcher = async() => {
    var ketcherFrame = document.getElementById('Ketcher2.5')
    var ketcher = null
    ketcher = ketcherFrame.contentWindow.ketcher
    var smile = await ketcher.getSmiles()
    console.log(smile)
    searchKetcher(smile)
    }

const handleOk = () => {
setLoading(true)
loadKetcher()
setTimeout(() => {
setLoading(false)
setVisible(false)
}, 3000)
}

const handleCancel = () => {
setVisible(false)
}

return (
<>
<Button type="link" block onClick={showModal}>
Structure Search
</Button>

<Modal
visible={visible}
title="Structure Search"
onOk={handleOk}
onCancel={handleCancel}
width={900}
footer={[
<Button key="back" onClick={handleCancel}>
Return
</Button>,

<Button key="Search" type="primary" loading={loading} onClick={handleOk}>
Search
</Button>,
]}
>
<div> 
<iframe id="Ketcher2.5" title="ketcher2.5" src="ketcher/index.html" width="800" height="600"></iframe>

</div>
</Modal>
</>
)
}



export default StructureSearch
