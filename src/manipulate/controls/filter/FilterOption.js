import React from 'react'
import PropTypes from 'prop-types'
import Glyphicon from 'react-bootstrap/lib/Glyphicon'
import xor from 'lodash/xor'
import './Filter.css'
import uncontrollable from 'uncontrollable'

const _FilterOption = ({
    name,
    allValues,
    currentValues,
    isOpen,
    onChangeIsOpen,
    onChangeCurrentValues
}) => {
    const allChecked = allValues.every(v => currentValues.includes(v))
    const allUnchecked = allValues.every(v => !currentValues.includes(v))

    const openable = allValues.length !== 1 || allValues[0] !==name
    return (
        <div className="filterBody large-6 columns">
            <input type="checkbox"
                   value={name}
                   onChange={
                       onChangeCurrentValues.bind(this, xor(allValues, currentValues).length ? allValues: [])
                   }
                   checked={allChecked}
                   ref={checkbox => {checkbox ? checkbox.indeterminate = !allChecked && !allUnchecked : null}}
            />

            <div className="groupName"
                 onClick={openable ? onChangeIsOpen.bind(this, !isOpen) : () => {}}
                 href="#">
                {name}
                {openable && <Glyphicon style={{fontSize: `x-small`, paddingLeft: `5px`}} glyph={isOpen ? `menu-up` : `menu-down`}/>}
            </div>

            {openable && isOpen &&
            <div className="options">
                {allValues.map(value => (
                    <div className="option" key={value}>
                      <input type="checkbox"
                             value={value}
                             onChange={onChangeCurrentValues.bind(this, xor([value], currentValues))}
                             checked={currentValues.includes(value)}/>
                      <span> {value}</span>
                    </div>
                ))}
            </div>
            }
        </div>
    )
}

_FilterOption.propTypes = {
    name: PropTypes.string.isRequired,
    allValues: PropTypes.arrayOf(PropTypes.string).isRequired,
    currentValues: PropTypes.arrayOf(PropTypes.string).isRequired,
    onChangeCurrentValues: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
    onChangeIsOpen: PropTypes.func.isRequired,
}

const FilterOption = uncontrollable(
    _FilterOption, {
        isOpen: `onChangeIsOpen`
    }
)

FilterOption.defaultProps = {
    defaultIsOpen: false
}

export default FilterOption
