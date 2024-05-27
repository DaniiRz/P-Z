function cerrarTodosModales() {
  var modalesAbiertos = document.getElementsByClassName('modal fade');
  for (var i = 0; i < modalesAbiertos.length; i++) {
    var modal = modalesAbiertos[i];
    var modalInstance = bootstrap.Modal.getInstance(modal);
    if (modalInstance) {
      modalInstance.hide();
    }
  }
}