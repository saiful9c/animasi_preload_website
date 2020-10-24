  $(document).ready(function(){
         $(function(){
            $("#id_form").submit(function(event){
                event.preventDefault();
                document.getElementById('loading').style="display:block;";
                document.getElementById('id_form').style="display:none;";
                var nama_lender = document.getElementById('nama_lender').value;
                var nama_staff = document.getElementById('nama_staff').value;
                var tanggal = document.getElementById('tanggal').value;
                var nomor_akad = document.getElementById('nomor_akad').value;
                var point = document.getElementById('point').value;
                var loan_id = document.getElementById('loan_id').value;
                var mjls = "";
                var mj = document.getElementById('majelis').value;
                if(mj==='+'){
                    mjls = document.getElementById('new_majelis').value;
                }else{
                    mjls = mj;
                }
                var xmlhttp = new XMLHttpRequest();
                xmlhttp.onreadystatechange = function() {
                   if (this.readyState == 4 && this.status == 200) {
                         if(this.responseText==="0"){
                            google.script.run.withSuccessHandler(point_created).createPoint(point);
                         }           
                         else{
                             var xmlhttp1 = new XMLHttpRequest();
                             xmlhttp1.onreadystatechange = function() {
                                if (this.readyState == 4 && this.status == 200) { 
                                   var idd_point = this.responseText;
                                     var xmlhttp2 = new XMLHttpRequest();
                                     xmlhttp2.onreadystatechange = function() {
                                      if (this.readyState == 4 && this.status == 200) {
                                         if(this.responseText==="0"){
                                            google.script.run.withSuccessHandler(majelis_created).createMajelis(idd_point, mjls);
                                         }
                                          else{
                                          var xmlhttp3 = new XMLHttpRequest();
                                          xmlhttp3.onreadystatechange = function() {
                                              if (this.readyState == 4 && this.status == 200) {
                                                  var f_id = this.responseText;
                                                  var f1 = document.getElementById('file');
                                                  var f2 = document.getElementById('file_spppj');
                                                  var f3 = document.getElementById('file_tr');
                                                  saveFile1(f1,f2,f3,loan_id,f_id);                            
                                              }
                                          };
                                          xmlhttp3.open("GET", url_php+"get_folder_id_majelis.php?nama_point="+point+"&nama_majelis="+mjls, true);
                                          xmlhttp3.send();
                                          }
                                       }
                                     };
                                     xmlhttp2.open("GET", url_php+"cek_majelis.php?nama_majelis="+mjls, true);
                                     xmlhttp2.send();
                                }
                             };
                             xmlhttp1.open("GET", url_php+"get_folder_id_point.php?nama_point="+point, true);
                             xmlhttp1.send();
                         }
                   }
                };
                xmlhttp.open("GET", url_php+"cek_point.php?nama_point="+point, true);
                xmlhttp.send();
            });
        });
        
        var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function() {
		  if (this.readyState == 4 && this.status == 200) {
		    var myObj = JSON.parse(this.responseText);
		    for(var i=0; i<myObj.length; i++){
		    	document.getElementById('point').innerHTML += "<option value='"+ myObj[i]['nama_point']+"'>"+myObj[i]['nama_point']+"</option>";
		    }
		  }
		};
		xmlhttp.open("GET", url_php+"get_point.php", true);
		xmlhttp.send();
    });
