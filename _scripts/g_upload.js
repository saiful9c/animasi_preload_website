      var folder_id_point   = "";
      var folder_id_majelis = "";
      function saveFile1(f1,f2,f3, rename, folder_id) {
        if(f1.files.length === 0){
          var a = [f1,f2,f3, rename, folder_id];
          saveFile2("#", a);
        }
        else{
        const file = f1.files[0];
        const fr = new FileReader();
        fr.onload = function(e) {
          const obj = {
            filename: rename+" - AKAD."+getExt(file.name),
            mimeType: file.type,
            bytes: [...new Int8Array(e.target.result)]
          };
          var a = [f1,f2,f3, rename, folder_id];
          google.script.run.withSuccessHandler(saveFile2).withUserObject(a).upload_file(obj, folder_id);
        };
        fr.readAsArrayBuffer(file);
        }
      }
      
      function saveFile2(status, a) {
        var rename = a[3];
        if(a[1].files.length === 0){
          var b = [a[0],a[1],a[2],a[3],a[4], status];
          saveFile3("#", b);
        }
        else{
        const file = a[1].files[0];
        const fr = new FileReader();
        fr.onload = function(e) {
          const obj = {
            filename: rename+" - SPPPJ."+getExt(file.name),
            mimeType: file.type,
            bytes: [...new Int8Array(e.target.result)]
          };
          var b = [a[0],a[1],a[2], a[3], a[4], status];
          google.script.run.withSuccessHandler(saveFile3).withUserObject(b).upload_file(obj, a[4]);
        };
        fr.readAsArrayBuffer(file);
        }
      }
      
      function saveFile3(status, b) {     
        var rename = b[3];
        if(b[2].files.length === 0){
          var c = [b[0],b[1],b[2], b[3], b[4], b[5], status];
          status_upload("#", c);
        }
        else{
        const file = b[2].files[0];
        const fr = new FileReader();
        fr.onload = function(e) {
          const obj = {
            filename: rename+" - TR."+getExt(file.name),
            mimeType: file.type,
            bytes: [...new Int8Array(e.target.result)]
          };
          var c = [b[0],b[1],b[2], b[3], b[4], b[5], status];
          google.script.run.withSuccessHandler(status_upload).withUserObject(c).upload_file(obj, b[4]);
        };
        fr.readAsArrayBuffer(file);
        }
      }
      
      function status_upload(status, c) {
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
         
        var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/\r\n/g,"\n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}}
        var encodedString = Base64.encode(c[5]+"@@@"+c[6]+"@@@"+status);
        var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function() {
		  if (this.readyState == 4 && this.status == 200) {
            document.getElementById('status').style="padding: 20px; margin-left: auto; margin-right: auto;";
            document.getElementById('loading').style="display:none";
		  }
		};
		xmlhttp.open("GET", url_php+"insert_report.php?nama_lender="+nama_lender+"&nama_staff="+nama_staff+"&tanggal_pencairan="+tanggal+"&loan_id="+loan_id+"&nama_majelis="+mjls+"&nomor_akad="+nomor_akad+"&nama_point="+point+"&file="+encodedString, true);
		xmlhttp.send(); 
    }

    function getExt(filename)
      {
        var ext = filename.split('.').pop();
        if(ext == filename) return "";
        return ext;
      }
      
    function ubah_point(data){
        var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function() {
		  if (this.readyState == 4 && this.status == 200) {
		    var myObj = JSON.parse(this.responseText);
            document.getElementById('majelis').innerHTML  = "<option value=''>Choose</option>";
		    for(var i=0; i<myObj.length; i++){
		    	document.getElementById('majelis').innerHTML += "<option value='"+ myObj[i]['nama_majelis']+"'>"+myObj[i]['nama_majelis']+"</option>";
		    }
            document.getElementById('majelis').innerHTML  += "<option value='+'>create new majelis</option>";
		  }
		};
		xmlhttp.open("GET", url_php+"data_majelis.php?nama_point="+data, true);
		xmlhttp.send();
    }
    
    function ubah_majelis(data){
       if(data==="+"){
           var a   = document.getElementById('new_majelis');
           var att = document.createAttribute("required");
           att.value = ""; 
           a.setAttributeNode(att);  
           document.getElementById('wadah_new_majelis').style="display:block;";
       }else{
          document.getElementById("new_majelis").removeAttribute("required");
          document.getElementById('wadah_new_majelis').style="display:none;";
       }
    }

    function point_created(status){
        folder_id_point = status;  
        var point = document.getElementById('point').value;
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
                var xmlhttp1 = new XMLHttpRequest();
                xmlhttp1.onreadystatechange = function() {
                   if (this.readyState == 4 && this.status == 200) {
                        if(this.responseText==="0"){
                            google.script.run.withSuccessHandler(majelis_created).createMajelis(status, mjls);
                         }
                         else{
                             var xmlhttp3 = new XMLHttpRequest();
                             xmlhttp3.onreadystatechange = function() {
                                if (this.readyState == 4 && this.status == 200) {
                                   var loan_id = document.getElementById('loan_id').value;
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
                xmlhttp1.open("GET", url_php+"cek_majelis.php?nama_majelis="+mjls, true);
                xmlhttp1.send();
		  }
		};
		xmlhttp.open("GET", url_php+"insert_point.php?nama_point="+point+"&folder_id="+status, true);
		xmlhttp.send();
    }
    
    function majelis_created(s){
        var point = document.getElementById('point').value;
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
               var loan_id = document.getElementById('loan_id').value;
               var f_id = s;
               var f1 = document.getElementById('file');
               var f2 = document.getElementById('file_spppj');
               var f3 = document.getElementById('file_tr');
               saveFile1(f1,f2,f3,loan_id,f_id);
		  }
		};
		xmlhttp.open("GET", url_php+"insert_majelis.php?nama_point="+point+"&nama_majelis="+mjls+"&folder_id="+s, true);
		xmlhttp.send();
     }
     
    function isi_ulang(){
        document.getElementById('loading').style="display:none;";
        document.getElementById('nama_lender').value="";
        document.getElementById('nama_staff').value="";
        document.getElementById('tanggal').value="";
        document.getElementById('nomor_akad').value="";
        document.getElementById('point').value="";
        document.getElementById('loan_id').value="";
        document.getElementById('majelis').value="";
        mjls = document.getElementById('new_majelis').value="";
        var file       = $("#file");
        var file_spppj = $("#file_spppj");
        var file_tr    = $("#file_tr");
        file.replaceWith(file.val('').clone(true));
        file.replaceWith(file_spppj.val('').clone(true));
        file.replaceWith(file_tr.val('').clone(true));
        document.getElementById('status').style="display:none;";
        document.getElementById('id_form').style="padding: 20px; margin-left: auto; margin-right: auto; display:block;";
        document.getElementById('wadah_new_majelis').style="display:none;";
    }
