function loadFile(evt) {
  evt.stopPropagation();
  evt.preventDefault();

  // FileList object.
  let files = evt.target.files;
  let file = files[0];
  const output = document.querySelector("#listParams");
  
  output.innerHTML=''
  let reader = new FileReader();
  reader.onload = function(progressEvent){
    // By lines
    const lines = this.result.split('\n');
    window["lines"] = lines
    const groups = groupsList(lines);
    window["groups"] = groups
    loadGroups(groups, lines)
    
    //const params = paramsList(lines);
    const params = paramsListByGroup(lines, groups[0][1]);
    for(let i = 0; i < params.length; i++){
      const param = params[i]
      const result = `<div class="param">${param[0]} - ${param[1]}</div>`
      output.insertAdjacentHTML("beforeend", result);
    }
    const stat = document.querySelector("#fileStat")
    const nbrGroups = groupsList(window["lines"]).length
    const nbrParams = paramsList(window["lines"]).length
    stat.innerHTML = `This file has <strong>${nbrGroups}</strong> groups and <strong>${nbrParams}</strong> parameters`
  };

  reader.readAsText(file);
}

function loadGroups(groups,lines){
  const inputGroup = document.querySelector("#inputGroup")
  inputGroup.innerHTML=''
  for(let i = 0; i < groups.length; i++){
    const group = groups[i] 
    const size = paramsListByGroup(lines, group[1]).length
    const result = `<option value="${group[1]}">${group[0]} (${size})</option>`
    inputGroup.insertAdjacentHTML("beforeend", result);
    
  }
}

function loadParams(){
  const output = document.querySelector("#listParams");
  const selectGroup = document.querySelector("#inputGroup").value;
  output.innerHTML = '';
  const params = paramsListByGroup(window["lines"], selectGroup);
  for(let i = 0; i < params.length; i++){
    const param = params[i]
    const result = `<div class="param">${param[0]} - ${param[1]}</div>`
    output.insertAdjacentHTML("beforeend", result);
  }
}

// Groups list [0]=Name [1]=id
function groupsList(lines){
  const groups = [];
  for(let i = 0; i < lines.length; i++){
    const line = lines[i]
    let column = line.split('\t')
    
    if (column[0]== "GROUP"){
      groups.push([column[2],column[1]])
    }
  }
  return groups.sort()
}

// Params list [0]=Name [1]=Type [2]=Group_id
function paramsList(lines){
  const params = []
  for(let i = 0; i < lines.length; i++){
    const line = lines[i]
    let column = line.split('\t')
    
    if (column[0]== "PARAM"){
      params.push([column[2], column[3], column[5]])
    }
  }
  return params.sort()
}

// Params list [0]=Name [1]=Type [2]=Group_id
function paramsListByGroup(lines,group){
  const params = []
  for(let i = 0; i < lines.length; i++){
    const line = lines[i]
    let column = line.split('\t')
    
    if (column[0] == "PARAM" && column[5] == group){
      params.push([column[2], column[3], column[5]])
    }
  }
  return params.sort()
}