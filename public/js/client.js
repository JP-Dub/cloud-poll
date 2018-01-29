
function expand() {
$("ol").append("<li>Option:</li><input type='text' name='answers' size='40'>");
};

function results(err, form) {
  console.log(err, "form",  form)
};
