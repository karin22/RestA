
 
        console.log("data");
    $.get("http://localhost:8080/api/products", function (data, status) {
        console.log(data);
        for (node in data){
            var post = data[node];
            var row = `  <tr>                           
                                     
                                     <td>  ${post.name}   </td>
                                     <td> ${post.category}   </td>
                                     <td>  ${post.price}   </td>
                                            
                        </tr> `;
            
            
                     
                        $("#post").append(row);
        }
       
      
    

           
           
        
     })
    
 
