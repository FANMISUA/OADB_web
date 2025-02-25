import React from 'react'
import {Row, Col} from 'antd'
import SearchLeftOption from './searchleftoption'
function SearchPageRevision1 () {
  return (
    <>
      <Row type="flex" justify="center">
        <Col xl={{ span: 24, offset: 0 }} >
          <SearchLeftOption />
        </Col>
      </Row>
    </>

  )
}

export default SearchPageRevision1