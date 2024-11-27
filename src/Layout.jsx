import React, { useState } from 'react'
import Header from './components/Header';
import TaskList from "./components/TaskList";
import TaskReportSummary from './components/TaskReportSummary';
import { taskReport } from './components/Utils/utils';


import  "./layout.scss";

const Layout = ({ setIsLoggedin }) => {
  const [report, setReport] = useState(taskReport());
  const [searchInput, setSearchInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const onCreatingTask = () => {
    setReport(taskReport())
  }

  const handleSearchInput = (userInput) => {
    setSearchInput(userInput);
  }
  
  return (
    <div className='layout-container'>
      <Header handleSearchInput={handleSearchInput} setIsLoggedin={setIsLoggedin} setIsOpen={setIsOpen} />
      <section className='content gr-gap-10'>
        <TaskList updateTaskReport={onCreatingTask} searchInput={searchInput} isOpen={isOpen} setIsOpen={setIsOpen} />
        <TaskReportSummary report={report} />
      </section>
    </div>
  )
}

export default Layout