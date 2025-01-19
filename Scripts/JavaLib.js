// Expose functions to the global scope
window.printH = printH;
window.printP = printP;
window.printSpan = printSpan;
window.printDiv = printDiv;
window.printPre = printPre;
window.printList = printList;
window.printHr = printHr;
window.printBr = printBr;
window.printLeerZeichen = printLeerZeichen;
window.printSpanColor = printSpanColor;


function printH(level, content) {
  if (level < 1 || level > 6) {
    console.error('Invalid headline level. Please use a number between 1 and 6.');
    return;
  }
  // Create a new headline element
  const headline = document.createElement(`h${level}`);
  // Set the text content of the headline to the content
  headline.textContent = content;
  // Append the headline to the body of the document
  document.body.appendChild(headline);
}
function printP(message) {
  // Create a new paragraph element
  const paragraph = document.createElement('p');
  // Set the text content of the paragraph to the message
  paragraph.textContent = message;
  // Append the paragraph to the body of the document
  document.body.appendChild(paragraph);
}
function printSpan(content) {
  // Create a new span element
  const span = document.createElement('span');
  // Set the text content of the span to the content
  span.textContent = content;
  // Append the span to the body of the document
  document.body.appendChild(span);
}
function printLeerZeichen(content) {
  // Create a new span element
  const span = document.createElement('span');
  // Set the text content of the span to the content
  span.textContent = content;
  // Set the style of the span to have white text color
  span.style.color = 'white';
  // Append the span to the body of the document
  document.body.appendChild(span);
}
function printSpanColor(color, content) {
  // Create a new span element
  const span = document.createElement('span');
  // Set the text content of the span to the content
  span.textContent = content;
  // Set the style of the span to have white text color
  span.style.color = color;
  // Append the span to the body of the document
  document.body.appendChild(span);
}

function printDiv(content) {
  // Create a new div element
  const div = document.createElement('div');
  // Set the text content of the div to the content
  div.textContent = content;
  // Append the div to the body of the document
  document.body.appendChild(div);
}
function printPre(content) {
  // Create a new pre element
  const pre = document.createElement('pre');
  // Set the text content of the pre to the content
  pre.textContent = content;
  // Append the pre to the body of the document
  document.body.appendChild(pre);
}
function printList(items) {
  // Create a new unordered list element
  const ul = document.createElement('ul');
  // Iterate over the items and create list item elements
  items.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item;
    ul.appendChild(li);
  });
  // Append the unordered list to the body of the document
  document.body.appendChild(ul);
}
function printHr() {
  // Create a new horizontal rule element
  const hr = document.createElement('hr');
  // Append the horizontal rule to the body of the document
  document.body.appendChild(hr);
}
function printBr() {
  // Create a new line break element
  const br = document.createElement('br');
  // Append the line break to the body of the document
  document.body.appendChild(br);
}