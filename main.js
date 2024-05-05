var productos=["cafe","cereal","leche","cheetos","pepsi","sopa","chips","amper"];
var precios = [40,30,25,16,20,8,17,19];

var selectProdutos=document.getElementById("productos");
var imgProductos=document.getElementById("imgProductos");
var precioProductos=document.getElementById("precioProducto");
var inputCantidad=document.getElementById("inputCantidad");
var agregarCarrito=document.getElementById("agregarCarrito");

let total=0;
var posProducto =-1;

var carrito = new Array();

const cargarProductos = ()=> {
    let optionProductos="";
    productos.forEach((producto)=>{
optionProductos +=`<option value="${producto}">${producto.toUpperCase()}</option>`;
    });
    selectProdutos.innerHTML=optionProductos;
    cargarPrecios();
}

selectProdutos.onchange=()=>{
    cargarPrecios();
}

const cargarPrecios =()=>{
    imgProductos.src=`${selectProdutos.value.toLowerCase()}.jpg`;
    precioProductos.innerHTML=`$${precios[selectProdutos.selectedIndex]}`
    posProducto=selectProdutos.selectedIndex;
}

inputCantidad.oninput = ()=>{
    document.getElementById("vcantidad").innerHTML=inputCantidad.value;
    cantidadProducto=parseInt(inputCantidad.value);
}

agregarCarrito.onclick=()=>{
    cantidadProducto=parseInt(inputCantidad.value);
    posProducto=selectProdutos.selectedIndex;


    if(revisarItem(posProducto, cantidadProducto)){
        imprimirTabla();
    }else{
    let item = new Array();
    item.push(posProducto);
    item.push(cantidadProducto);
    carrito.push(item);
    imprimirTabla();
    }
}

const imprimirTabla = () =>{
    let divCarrito=document.getElementById("carrito");
    let tablaHTML=`<table class="table table-dark table-striped w-50 m-auto">
    <tr>
    <td>PRODUCTO</td>
    <td>PRECIO</td>
    <td>CANTIDAD</td>
    <td>IMPORTE</td>
    <td>*</td>
    </tr>`;
    let index = 0;
    total=0;
    carrito.forEach(item =>{
        let productoIndex = item[0];
        let cantidad = item[1];
        let precio = precios[productoIndex];

        tablaHTML +=`
    <tr>
    <td><img src="${productos[productoIndex].toLocaleLowerCase()}.jpg"  alt="No cargo" height="60px"></td>
    <td>$${precio}.00</td>
    <td>${cantidad}</td>
    <td>$${precio*cantidad}.00</td>
    <td><button class="btn btn-danger" onclick="eliminarProducto(${index})">Eliminar</button></td>
    </tr>`;
    index++;
    total +=precio*cantidad;
    });
    let cambio=0;
    tablaHTML +=`
    <tr>
    <td></td>
    <td></td>
    <td><h3>TOTAL</h3></td>
    <td>$${total}.00</td>
    <td><button class="btn btn-success" onclick="pagarProducto(${total})">Pagar</button></td>
    </tr>
    </table>`;

    divCarrito.innerHTML = tablaHTML;
}

const pagarProducto =(total)=>{
    Swal.fire({
        title: `TOTAL A PAGAR: $${total}.00`,
        input: "number",
        showCancelButton: true,
        confirmButtonText: "Enviar",
        showLoaderOnConfirm: false,
      }).then((result) => {
        if (result.isConfirmed) {
            let pago= result.value;
            let cambio = pago-total;
            if(cambio>=0){
          Swal.fire({
            title: "PAGO COMPLETADO",
            text: `Tu cambio es: $${cambio.toFixed(2)}`,
            icon: "success"
          });
          eliminarTabla();
          }else{
            Swal.fire({
                title: "PAGO NO COMPLETADO",
                text: `INGRESA OTRA CANTIDAD`,
                icon: "error"
              });
          }
          
        }
      });
}

const eliminarTabla = () =>{
    carrito=[];
    document.getElementById("carrito").innerHTML="";
}

const revisarItem =(pos,cant)=>{
    let x = false;
    carrito.forEach(item=>{
        if(item[0]==pos){
            item[1]=item[1]+=cant;
            x=true;
        }
    });
    return x;
}

const eliminarProducto =(index)=>{
    Swal.fire({
        title: "ESTAS SEGURO?",
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: "Si",
        denyButtonText: `NO`
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire("Eliminado", "", "success");
          carrito.splice(index, 1);
          imprimirTabla();
          if(carrito==0){
            eliminarTabla();
          }
        }
      });
} 

const verProductos=()=>{
    let divListaProductos = document.getElementById("listaProductos"); 
    let tablaHTML = `<table class="table table-striped">
    <tr>
    <td>PRODUCTO</td>
    <td>PRECIO</td>
    <td>DEL</td>
    </tr>`;

    let index = 0;
    productos.forEach(item=>{
        tablaHTML += `<table">
    <tr>
    <td>${item}</td>
    <td>$${precios[index]}.00</td>
    <td><button class="btn btn-danger" onclick="eliminarProducto2(${index})">del</button></td>
    </tr>`;
    });

    divListaProductos.innerHTML=tablaHTML;
}


const addProductos =()=>{
    let nombre = document.getElementById("nombre").value;
    let precio = document.getElementById("precioP").value;

    document.getElementById("nombre").value="";
    document.getElementById("precioP").value="";

    if(nombre =="" || precio==""){
        Swal.fire({
            title: "NO SE PUDO AGREGAR EL PRODUCTO",
            text: `PROCURA LLENAR LOS CAMPOS VACIOS`,
            icon: "error"
          });
    }else{
        productos.push(nombre);
        precios.push(precio);
        verProductos();
        cargarProductos();
    }
}

const eliminarProducto2 =(index)=>{
    Swal.fire({
        title: "ESTAS SEGURO?",
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: "Si",
        denyButtonText: `NO`
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire("Eliminado", "", "success");
          productos.splice(index, 1);
          precios.splice(index, 1);
          verProductos();
          cargarProductos();
        }
      });
}