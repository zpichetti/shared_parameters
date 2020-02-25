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
    
    //const params = paramsList(lines);
    const params = paramsListByGroup(lines, groups[0][0]);
    for(let i = 0; i < params.length; i++){
      const param = params[i]
      const result = `<p>${param[0]} - ${param[1]}</p>`
      output.insertAdjacentHTML("beforeend", result);
    }
  };
  reader.readAsText(file);
}

function loadParams(){
  const output = document.querySelector("#listParams");
  const selectGroup = document.querySelector("#inputGroup").value;
  output.innerHTML = '';
  const params = paramsListByGroup(window["lines"], selectGroup);
  for(let i = 0; i < params.length; i++){
    const param = params[i]
    const result = `<p>${param[0]} - ${param[1]}</p>`
    output.insertAdjacentHTML("beforeend", result);
  }
}

// Groups list [0]=Id [1]=Name
function groupsList(lines){
  const inputGroup = document.querySelector("#inputGroup")
  inputGroup.innerHTML=''
  const groups = [];
  for(let i = 0; i < lines.length; i++){
    const line = lines[i]
    let column = line.split('\t')
    
    if (column[0]== "GROUP"){
      groups.push([column[1],column[2]])
      const size = paramsListByGroup(lines, column[1]).length
      const result = `<option value="${column[1]}">${column[2]} (${size})</option>`
      inputGroup.insertAdjacentHTML("beforeend", result);
    }
  }
  console.log(groups)
  return groups
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
  console.log(params)
  return params
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
  console.log(params)
  return params
}