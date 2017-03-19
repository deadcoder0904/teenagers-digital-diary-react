import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/css/bootstrap-theme.min.css'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import './react-bootstrap-table-all.min.css'
import './index.css'

let diary = getDiary() || [{"no":1,"problem":"Internet is a daily need","solution":"Don't over use the Internet. Use it as long as its necessary."},{"no":2,"problem":"Self-Esteem and Body Image","solution":"Forgive yourself. Everyone makes mistakes — and mistakes aren't permanent reflections on you as a person. Stop the negative self talk. Surround yourself with people that have healthy relationships with their bodies and healthy relationships with food."},{"no":3,"problem":"Stress","solution":"Focus as much as possible on doing one thing at a time. Clear your desk of distractions. Pick something to work on."},{"no":4,"problem":"Bullying","solution":"Stand up for people who are bullied. Bullies often want an audience and approval."},{"no":5,"problem":"Depression","solution":"Avoid caffeine, which reduces serotonin levels. Expose yourself to sunlight, which can boost mood and increase Vitamin D levels."},{"no":6,"problem":"Drinking & Smoking","solution":"Avoid places where people smoke or drink. Being near places where smoking and drinking are encouraged can be dangerous when you are trying to quit. Avoid bars and other places where alcohol and tobacco are likely to be used.Take a break from people who regularly drink/smoke."},{"no":7,"problem":"Peer-Pressure","solution":"Use a strong voice, stand up tall, and look the peers in the eye"},{"no":8,"problem":"Competition","solution":"Take in your surroundings and know who your competitors are, both near and far. & beat them up"},{"no":9,"problem":"Suicide","solution":"You're not alone; many of us have had suicidal thoughts at some point in our lives. Feeling suicidal is not a character defect, and it doesn't mean that you are crazy, or weak, or flawed. It only means that you have more pain than you can cope with right now. This pain seems overwhelming and permanent at the moment. But with time and support, you can overcome your problems and the pain and suicidal feelings will pass."},{"no":10,"problem":"Violence","solution":"Work together for peace, justice, and reconciliation at all levels - local, regional, and global. To embrace creative approaches to peace building which are consonant with the spirit of the gospel."},{"no":11,"problem":"Drugs","solution":"Stop the addictive behavior as planned. When the big day arrives, keep your promise to yourself and quit."}];

function setDiary(diaryContent) {
	localStorage.setItem('diaryContent', JSON.stringify(diaryContent));
}

function getDiary() {
	var data = JSON.parse(localStorage.getItem('diaryContent'));
	if(data && data.length)
		return data;
	return undefined;
}

function onAfterInsertRow(row) {
 diary.push(row);
 setDiary(diary);
}

function onAfterDeleteRow(no) {
let i = 0, j = 0;
if(no.length > 1) {
	while(i < no.length) {
		while(j < diary.length) {
			if(diary[j]["no"] == no[i]) {
				diary.splice(j,1);
				i++;
				break;
			}
		}
	}
}
else {
 	diary.forEach(function(el,index) {
		if(el.no == no){
			diary.splice(index,1);
		}
	});
 }
 setDiary(diary);
}

function onAfterSaveCell(row) {
	diary.forEach(function(el,index) {
		if(el.no == row.id)
			diary[index] = row;
	});
  setDiary(diary);
}

const selectRowProp = {
  mode: 'checkbox'
};

const cellEditProps = {
  mode: 'dbclick',
  blurToSave: true,
  afterSaveCell: onAfterSaveCell  // a hook for after saving cell
};

const options = {
  clearSearch: true,
  afterDeleteRow: onAfterDeleteRow,  // A hook for after droping rows.
  afterInsertRow: onAfterInsertRow   // A hook for after insert rows
};

class App extends Component {
	render() {
		return (
				<div>
					<h1>Teenagers Digital Diary</h1>
					<BootstrapTable data={ diary }  exportCSV insertRow deleteRow search pagination options={ options } selectRow={ selectRowProp } cellEdit={ cellEditProps }
					 >
			          <TableHeaderColumn dataField='no' width="75" dataSort isKey>No</TableHeaderColumn>
			          <TableHeaderColumn dataField='problem' width="300"tdStyle={ { whiteSpace: 'normal' } } dataSort>Problem</TableHeaderColumn>
			          <TableHeaderColumn dataField='solution' tdStyle={ { whiteSpace: 'normal' } } dataSort>Solution</TableHeaderColumn>
			        </BootstrapTable>
				</div>
			)
	}
}

ReactDOM.render(<App />, document.getElementById('app'));
