import React from 'react'
import { Cascader } from 'antd'
// import { useState } from 'react'
const options = [
  {
    value: 'Chemical',
    label: 'Chemical',
    children: [
      {
        value: 'Name',
        label: 'by Name',
      },
      {
        value: 'Weight',
        label: 'by Weight',
      },
      {
        value: 'AlogP',
        label: 'by AlogP',
      },
      {
        value: 'CasNO',
        label: 'by CasNO',
      },
    ],
  },
  {
    value: 'Assay',
    label: 'Assay',
    children: [
      {
        value: 'Name',
        label: 'by Name',
      },
    ],
  },
  {
    value: 'Reference',
    label: 'Reference',
    children: [
      {
        value: 'Name',
        label: 'by Name',
      },
    ],
  },
  {
    value: 'Data',
    label: 'Data',
    children: [
      {
        value: 'ActivityValue',
        label: 'by Activity Value',
      },
    ],
  },
]

function CascadeOption (props) {
  const [text, setText] = React.useState('table and attributes')
  const { getOption } = props
  const onChange = (value, selectedOptions) => {
    const labeText = selectedOptions.map(o => o.label).join(', ')
    if (value[0] === 'Chemical' && value[1] === 'Name') {
      getOption(1)
    }
    else if (value[0] === 'Chemical' && value[1] === 'Weight') {
      getOption(2)
    }
    else if (value[0] === 'Chemical' && value[1] === 'AlogP') {
      getOption(3)
    }
    else if (value[0] === 'Chemical' && value[1] === 'CasNO') {
      getOption(4)
    }
    else {
      getOption(0)
    }
    setText(labeText)
    console.log(value[0], value[1])
  }

  return (

    <span>
      <Cascader options={options} onChange={onChange}>
        <a href="/#">Select</a>
      </Cascader>
      &nbsp;
      {text}
    </span>
  )
}


export default CascadeOption