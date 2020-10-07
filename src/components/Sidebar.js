import React from 'react'
import Select from 'react-select'
import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated();

const locationOpts = [
  { value: 'batam', label: 'Batam' },
  { value: 'jogja', label: 'Jogja' },
]

const animalTypeOpts = [
  { value: 'dog', label: 'Dog' },
  { value: 'cat', label: 'Cat' },
]

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar__inner">
        <form action="">
          <Select components={animatedComponents} placeholder="Search Location" className="select" options={locationOpts} />
          <Select components={animatedComponents} placeholder="Select animal type" className="select" options={animalTypeOpts} />

          <input type="submit" className="button button--outline" value="Search" />
        </form>
      </div>
    </aside>
  )
}

export default Sidebar
