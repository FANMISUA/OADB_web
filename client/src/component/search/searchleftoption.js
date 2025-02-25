import React, { useRef, useState } from 'react'
import { Col, Row } from 'antd'
import { Select } from 'antd'
import { Radio, Space } from 'antd'
import { message } from 'antd'
import { Input } from 'antd'
import { Button } from 'antd'
// import { Table } from 'antd'
import { Table } from 'ant-table-extensions'
import { SearchOutlined } from '@ant-design/icons'
import './searchleftoption.css'
import Highlighter from 'react-highlight-words'

// import SmilesDrawer from 'smiles-drawer'
const port = process.env.REACT_APP_PORT || 6000


function SearchLeftOption () {

  const [value, setValue] = useState(0)
  const [disabled, setDisabled] = useState(true)
  const [ctableFlag, setCTableFlag] = useState(false)
  const [imgFlag, setImgFlag] = useState(false)
  const [seloption, setSeloption] = useState(0)
  const [list, setList] = useState([])
  const [imgvisible, setImgVisible] = useState(false)
  const [curPage, setCurPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)


  //add search function to each column
  const [searchText, setSearchText] = useState('')
  const [searchedColumn, setSearchedColumn] = useState('')
  const searchInput = useRef(null)

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm()
    setSearchText(selectedKeys[0])
    setSearchedColumn(dataIndex)
  }

  const handleReset = (clearFilters) => {
    clearFilters()
    setSearchText('')
  }

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div
        style={{
          padding: 8,
        }}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              })
              setSearchText(selectedKeys[0])
              setSearchedColumn(dataIndex)
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1890ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()) || "",
    // onFilterDropdownVisibleChange: (visible) => {
    //   if (visible) {
    //     setTimeout(() => searchInput.current.select(),1000);
    //     console.log(searchInput.current.select())
    //   }
    // },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  })


  //table columns
  const chemicalcolumns =
    [
      {
        title: 'Structure',
        dataIndex: 'structure',
        key: 'structure',
        render: (text, record) => {
          return (
            <div>
              <img src={record.dynamicimage} alt="structure" placeholder={{ imgvisible, onVisibleChange: (value) => { setImgVisible(value) } }} />
              {/* <img  src={require('./ketchertest.png')} alt="description"/> */}
            </div>
          )
        }
      },
      {
        title: 'ID',
        dataIndex: 'oadb_chemicalid',
        key: 'oadb_chemicalid',
        ...getColumnSearchProps('oadb_chemicalid'),
        sorter: (a, b) => {
          a = a.cid || ''
          b = b.cid || ''
          return a.localeCompare(b)
        }
      },
      {
        title: 'ChemicalName',
        dataIndex: 'cmpdname',
        key: 'name',
        ...getColumnSearchProps('cmpdname'),
        sorter: (a, b) => {
          a = a.cmpdname || ''
          b = b.cmpdname || ''
          return a.localeCompare(b)
        }
      },
      {
        title: 'AlogP',
        dataIndex: 'alogp',
        key: 'alogp',
        // ...getColumnSearchProps('alogp'),
        // sorter:(record1, record2)=>{
        //   return record1.alogp > record2.alogp
        // }
        sorter: (a, b) => {
          a = a.alogp || ''
          b = b.alogp || ''
          return a.localeCompare(b)
        }
      },
      {
        title: 'Weight',
        dataIndex: 'molecularweight',
        key: 'molecularweight',
        // ...getColumnSearchProps('molecularweight'),
        sorter: (a, b) => {
          a = a.molecularweight || ''
          b = b.molecularweight || ''
          return a.localeCompare(b)
        }
      },
      {
        title: 'CASNO',
        dataIndex: 'casno',
        key: 'casno',
        // ...getColumnSearchProps('casno'),
        sorter: (a, b) => {
          a = a.casno || ''
          b = b.casno || ''
          return a.localeCompare(b)
        }
      },
      {
        title: 'SMILES',
        dataIndex: 'smiles',
        key: 'smiles',
        ...getColumnSearchProps('smiles'),
        sorter: (a, b) => {
          a = a.smiles || ''
          b = b.smiles || ''
          return a.localeCompare(b)
        }
      },
      {
        title: 'Activity',
        dataIndex: 'activity',
        key: 'activity',
        ...getColumnSearchProps('activity'),
        sorter: (a, b) => {
          a = a.activity || ''
          b = b.activity || ''
          return a.localeCompare(b)
        }
      },
      {
        title: 'Endpoint',
        dataIndex: 'endpoint',
        key: 'endpoint',
        // ...getColumnSearchProps('endpoint'),
        sorter: (a, b) => {
          a = a.endpoint || ''
          b = b.endpoint || ''
          return a.localeCompare(b)
        }

      },
      {
        title: 'Relation',
        dataIndex: 'relation',
        key: 'relation',
      },
      {
        title: 'Value',
        dataIndex: 'value',
        key: 'value',
        // ...getColumnSearchProps('value'),
        sorter: (a, b) => {
          if (a && a.value && b && b.value) {
            return a.value - b.value
          } else if (a && a.value) {
            return -1
          } else if (b && b.value) {
            return 1
          }
          return 0
        }
      },
      {
        title: 'standardunits',
        dataIndex: 'standardunits',
        key: 'standardunits',
      },
      {
        title: 'Receptor',
        dataIndex: 'receptor',
        key: 'receptor',
        ...getColumnSearchProps('receptor'),
        sorter: (a, b) => {
          a = a.receptor || ''
          b = b.receptor || ''
          return a.receptor > b.receptor
        }
      },
      {
        title: 'AssayType',
        dataIndex: 'aidtype',
        key: 'aidtype',
        ...getColumnSearchProps('aidtype'),
        sorter: (a, b) => {
          a = a.aidtype || ''
          b = b.aidtype || ''
          return a.localeCompare(b)
        }
      },
      {
        title: 'AssayName',
        dataIndex: 'aidname',
        key: 'aidname',
        ...getColumnSearchProps('aidname'),
        sorter: (a, b) => {
          a = a.aidtype || ''
          b = b.aidtype || ''
          return a.localeCompare(b)
        }
      },
      {
        title: 'AssaySource',
        dataIndex: 'aidsrcname',
        key: 'aidsrcname',
        ...getColumnSearchProps('aidsrcname'),
        sorter: (a, b) => {
          a = a.aidsrcname || ''
          b = b.aidsrcname || ''
          return a.localeCompare(b)
        }
      },
      {
        title: 'TargetName',
        dataIndex: 'targetnamepubchem',
        key: 'targetnamepubchem',
        ...getColumnSearchProps('targetnamepubchem'),
        sorter: (a, b) => {
          a = a.targetnamepubchem || ''
          b = b.targetnamepubchem || ''
          return a.localeCompare(b)
        }
      },
      {
        title: 'TargetUrl',
        dataIndex: 'targetUrl',
        key: 'targeturl',
        // ...getColumnSearchProps('targetUrl'),
        sorter: (a, b) => {
          a = a.targetUrl || ''
          b = b.targetUrl || ''
          return a.localeCompare(b)
        }
      },
      {
        title: 'Journal',
        dataIndex: 'documentjournal',
        key: 'documentjournal',
        // ...getColumnSearchProps('documentjournal'),
        sorter: (a, b) => {
          a = a.documentjournal || ''
          b = b.documentjournal || ''
          return a.localeCompare(b)
        }
      },
      {
        title: 'Year',
        dataIndex: 'documentyear',
        key: 'documentyear',
        // ...getColumnSearchProps('documentyear'),
        sorter: (a, b) => {
          a = a.documentyear || ''
          b = b.documentyear || ''
          return a.localeCompare(b)
        }
      },
    ]

  const info = (msg) => {
    message.info(
      {
        content: msg,
        className: 'custom-class',
        style: {
          marginTop: '15vh',
        },
      })
  }

  const RadioonChange = (e) => {
    console.log('radio checked', e.target.value)
    setValue(e.target.value)
    setSeloption(e.target.value)
  }

  const { Option } = Select
  const { Search } = Input

  const SelectTypehandleChange = (value) => {
    console.log(`selected ${value}`)
    if (value === "StructureSearch") {
      setDisabled(true)
    }
    if (value === "TextSearch") {
      setDisabled(false)
    }
  }

  //text search
  const onSearch = (value) => {
    console.log(value, seloption)
    if (seloption === 0) {
      info('select search option before Text Search')
    }
    if (seloption === 1) {
      console.log('search by chemical name...')
      if (value) {
        setCTableFlag(true)
        loadChemicalListbyname(value)
      }
      else {
        setList([])
        // console.log('Search by chemical name. For example:aspirin')
        info('Search by chemical name. For example:aspirin')
      }
    }
    else if (seloption === 2) {
      console.log('search by smile...')
      if (value) {
        setCTableFlag(true)
        loadChemicalListbysmiles(value)
      }
      else {
        setList([])
        info('Search by chemical smile code. For example:CC(O)CC(C)O')

      }
    }
    else if (seloption === 3) {
      console.log('search by casno...')
      if (value) {
        setCTableFlag(true)
        loadChemicalListbycasno(value)
      }
      else {
        setList([])
        info('Search by chemical CasNo. For example: 41451-81-4')

      }
    }
    else if (seloption === 4) {
      console.log('search by Assay name...')
      if (value) {
        setCTableFlag(true)
        loadChemicalListbyassayname(value)
      }
      else {
        setList([])
        info('Search by Assay Name. For example: kappa opioid receptor')

      }
    }
    else if (seloption === 5) {
      console.log('search by Activity value...')
      if (value) {
        setCTableFlag(true)
        loadChemicalListbyactivitydata(value)
      }
      else {
        setList([])
        info('Search by activity value. For example: 10 15')

      }
    }
    else
      console.log('not find select option')
  }

  // const range = (start, stop, step = 1) =>
  // Array(Math.ceil((stop - start) / step)).fill(start).map((x, y) => x + y * step)


  //smiles draw show structure
  const loadStructurePage = async (curPage, pageSize) => {
    setImgFlag(true)
    console.log("loading new from ...", curPage, pageSize, list)
    var ketcherFrame = document.getElementById('Ketcher2.5')
    var ketcher = null
    // var urlCreator = window.URL ||window.webketURL
    ketcher = ketcherFrame.contentWindow.ketcher
    var smilecode = await ketcher.getSmiles()
    console.log("querying...", smilecode, curPage.pageSize)
    loadStructureImage(list, 'loading', curPage, pageSize)

  }

  const loadStructureImage = async (list, value, curPage, pageSize) => {
    setImgFlag(true)
    setCTableFlag(false)
    console.log("load image...", value, curPage, pageSize)
    console.log(value)
    let canvas = document.getElementById("structureimg")
    console.log("loading pagination info...", curPage, pageSize)
    // let smilesDrawer = new SmilesDrawer.Drawer({ width: 250, height: 250 });
    window
      .initRDKitModule()
      .then(function (RDKit) {
        console.log("RDKit version: " + RDKit.version())
        window.RDKit = RDKit
        /**
         * The RDKit module is now loaded.
         * You can use it anywhere.
         */
        // for(var k in range(curPage*pageSize, (curPage+2)*pageSize)){
        //   console.log(k)

        for (var i in list) {
          // console.log(list[i]['smiles'])
          //draw the smile image
          // mol.draw_to_canvas(canvas, -1, -1)
          //draw the image with matching substructure
          var mol = RDKit.get_mol(list[i]['smiles'])
          if (value === 'cnamesearch') {
            // console.log("show image for text search",list[i]['smiles'],)
            if (i >= (curPage - 1) * pageSize && i <= curPage * pageSize) {
              mol = RDKit.get_mol(list[i]['smiles'])
              mol.draw_to_canvas(canvas, -1, -1)
            }
          }
          else {
            if (i >= (curPage - 1) * pageSize && i <= curPage * pageSize) {
              var qmol = RDKit.get_qmol(value)
              var mdetails = mol.get_substruct_match(qmol)
              mol.draw_to_canvas_with_highlights(canvas, mdetails)
              // mol.draw_to_canvas(canvas, -1, -1)
              // list[i].dynamicimage = canvas.toDataURL()
            }
          }
          list[i].dynamicimage = canvas.toDataURL()

        }
        setImgFlag(false)
        if (list[0]) {
          setCTableFlag(true)
        }
        // var mol = RDKit.get_mol(list[1]['smiles']);
        // mol.draw_to_canvas(canvas, -1, -1);
      })
      // setImgFlag(false)

      .catch((e) => {
        // handle loading errors here...
        console.log(e)
      })



  }

  //ketcher image
  const loadKetcheImage = async () => {
    var ketcherFrame = document.getElementById('Ketcher2.5')
    var ketcher = null
    // var urlCreator = window.URL ||window.webketURL
    ketcher = ketcherFrame.contentWindow.ketcher
    var smile = await ketcher.getSmiles()
    loadChemicalListbysmiles(smile)
    // var aBolb = ketcher.generateImage('CCCC')
    // console.log(ketcher.setMolecule('CCCC'))
    console.log(smile)
    // setCTableFlag(true)
    // console.log(aBolb)
    // setImgFlag(true)
    // setImgUrl(urlCreator.createObjectURL(aBolb[0]));
    // console.log(urlCreator.createObjectURL(ketcher.generateImage('CCCC'))[0])

  }

  //structure search
  const handleStructureSearch = () => {
    loadKetcheImage()
    console.log('search structure')
  }

  //text search to get all master table information by smiles
  const loadChemicalListbysmiles = async (value) => {
    setImgFlag(true)
    console.log(value)
    setList([])
    const response = await fetch(`http://localhost:${port}/structurequery/${value}`)
    const jsonData = await response.json()
    console.log(jsonData)
    // console.log(list)
    // console.log(value)
    loadStructureImage(jsonData, value, curPage, pageSize)
    setList(jsonData)
    setImgFlag(false)
  }

  //text search to get all master table information by casno
  const loadChemicalListbycasno = async (value) => {
    setImgFlag(true)
    console.log(value)
    setList([])
    const response = await fetch(`http://localhost:${port}/casnoquery/${value}`)
    const jsonData = await response.json()
    console.log(jsonData)
    // console.log(list)
    // console.log(value)
    loadStructureImage(jsonData, value, curPage, pageSize)
    setList(jsonData)
    setImgFlag(false)
  }


  //text search to get all master table information by casno
  const loadChemicalListbyassayname = async (value) => {
    setImgFlag(true)
    console.log(value)
    setList([])
    const response = await fetch(`http://localhost:${port}/assaynamequery/${value}`)
    const jsonData = await response.json()
    console.log(jsonData)
    // console.log(list)
    // console.log(value)
    loadStructureImage(jsonData, value, curPage, pageSize)
    setList(jsonData)
    setImgFlag(false)
  }


  //text search to get all master table information by casno
  const loadChemicalListbyactivitydata = async (value) => {
    setImgFlag(true)
    console.log(value)
    setList([])
    let minval = value.split(" ")[0]
    let maxval = value.split(" ")[1]
    const response = await fetch(`localhost:${port}/activitydataquery?minvalue=${minval}&maxvalue=${maxval}`)
    const jsonData = await response.json()
    console.log(jsonData)
    // console.log(list)
    // console.log(value)
    loadStructureImage(jsonData, value, curPage, pageSize)
    setList(jsonData)
    setImgFlag(false)
  }

  //text search to get all master table information by names
  const loadChemicalListbyname = async (value) => {
    setImgFlag(true)
    setCTableFlag(false)
    console.log(value)
    setList([])
    const response = await fetch(`http://localhost:${port}/mastertableinfo/${value}`)
    const jsonData = await response.json()
    setList(jsonData)
    console.log(jsonData)
    // console.log(list)
    // console.log(value)
    loadStructureImage(jsonData, 'cnamesearch', curPage, pageSize)
    setImgFlag(false)
  }

  //text search to get all master table information by smiles

  // //expand table details
  //   const columns1 = [
  //     {
  //       title: 'ID',
  //       dataIndex: 'oadb_chemicalid',
  //       key: 'oadb_chemicalid',    
  //     },
  //     {
  //       title: 'ChemicalName',
  //       dataIndex: 'cmpdname',
  //       key: 'name',
  //     },
  //   ]



  return (
    <>
      <div id='left'>
        <Row type="flex" justify="left">
          <Col span={12} offset={0}>
            1. Search Type:
          </Col>
          <Col span={12} offset={0}>
            <Select
              defaultValue="Structure Search"
              style={{
                width: 200,
              }}
              onChange={SelectTypehandleChange}
            >
              <Option value="StructureSearch">Structure Search</Option>
              <Option value="TextSearch">Text Search</Option>
            </Select>
          </Col>
        </Row>
        <Row type="flex" justify="left">
          <Col span={12} offset={0}>
            2. Chemical:
          </Col>
          <Col span={12} offset={0}>
            <Radio.Group onChange={RadioonChange} value={value}>
              <Space direction="vertical">
                <Radio value={1} defaultChecked={false}
                  disabled={disabled}>
                  Chemical Name Search</Radio>
                <Radio value={2} defaultChecked={false}
                  disabled={disabled}>
                  Smiles Search</Radio>
                <Radio value={3} defaultChecked={false}
                  disabled={disabled}>
                  CasNo Search</Radio>
              </Space>
            </Radio.Group>
          </Col>
        </Row>
        <Row type="flex" justify="left">
          <Col span={12} offset={0}>
            3. Assay:
          </Col>
          <Col span={12} offset={0}>
            <Radio.Group onChange={RadioonChange} value={value}>
              <Space direction="vertical">
                <Radio value={4} defaultChecked={false}
                  disabled={disabled}>Assay Name Search</Radio>
              </Space>
            </Radio.Group>
          </Col>
        </Row>
        <Row type="flex" justify="left">
          <Col span={12} offset={0}>
            4. Activity:
          </Col>
          <Col span={12} offset={0}>
            <Radio.Group onChange={RadioonChange} value={value}>
              <Space direction="vertical">
                <Radio value={5} defaultChecked={false}
                  disabled={disabled}>Activity Data Search</Radio>
              </Space>
            </Radio.Group>
          </Col>
        </Row>
        <Row type="flex" justify="left">
          <Col span={12} offset={0}>
            Text Search Input:
          </Col>
        </Row>
        <Row type="flex" justify="left">
          <Col span={12} offset={0}>
            <Search
              style={{ width: '400px' }}
              placeholder="input search text"
              allowClear
              enterButton="Text Search"
              size="default"
              onSearch={onSearch}
              disabled={disabled}
            />
          </Col>
        </Row>
        <Row type="flex" justify="left">
          <Col span={12} offset={0}>
            Structure Search:

          </Col>
        </Row>
        <Row type="flex" justify="left">
          <Col span={8} offset={4}>
            <Button type="primary" disabled={!disabled} icon={<SearchOutlined />} onClick={handleStructureSearch} >
              Structure Search
            </Button>
          </Col>
        </Row >
      </div>
      <div id="right">
        <Row type="flex" justify="left">
          <Col span={8} offset={0}>
            <iframe id="Ketcher2.5" title="ketcher2.5" src="ketcher/index.html" width="800" height="600"></iframe>
          </Col>
        </Row>
      </div>

      {/* add Table component */}
      <div id="bottom">
        <Row type="flex" justify="left">
          <Col span={24} offset={0}>
            {ctableFlag ?
              <Table
                dataSource={list}
                columns={chemicalcolumns}
                rowkey={list.oadb_chemicalID}
                exportableProps={{ showColumnPicker: true }}
                // expandable={{
                //   expandedRowRender: (record) => (
                //    <p style={{margin:0,}}> {record.activity} </p> 
                //   ),
                //     defaultExpandedRowKeys:[0],
                // }}
                pagination={{
                  current: curPage,
                  pageSize: pageSize,
                  onChange: (curPage, pageSize) => {
                    setCurPage(curPage)
                    setPageSize(pageSize)
                    loadStructurePage(curPage, pageSize)
                  }
                }} /> : null}
            {imgFlag ?
              <canvas id="structureimg" ></canvas> : null}
          </Col>
        </Row>
      </div>

    </>
  )
}

export default SearchLeftOption

