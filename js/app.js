document.addEventListener("DOMContentLoaded",function(){
    $(document).ready(function() {
        $('#form1').on('submit', function(e) {
            e.preventDefault();
        });
        $('#form2').on('submit', function(e) {
            e.preventDefault();
        });
        $('#form3').on('submit', function(e) {
            e.preventDefault();
        });
        $('#form4').on('submit', function(e) {
            e.preventDefault();
        });
        $('#form5').on('submit', function(e) {
            e.preventDefault();
        });
        $('#form6').on('submit', function(e) {
            e.preventDefault();
        });
        $('#form7').on('submit', function(e) {
            e.preventDefault();
        });
    });

    // tìm UCLN
    gcd = (a,b) => {
        if (a == 0 || b == 0){
            return a + b;
        }
        while(a!=b){
            if(a>b) a = a-b;
            else b = b-a;
        }
        return a;
    }

    // web A^B mod C
    modCalculator = () => {
        var p1 = document.getElementById("result-mod-calculator");
        var inputA1 = document.getElementById("input-mod-calculator-A").value;
        var inputB1 = document.getElementById("input-mod-calculator-B").value;
        var inputC1 = document.getElementById("input-mod-calculator-C").value;
        var A1 = parseInt(inputA1);
        var B1 = parseInt(inputB1);
        var C1 = parseInt(inputC1);
        if(inputA1=="" || inputB1=="" || inputC1=="")
            p1.innerHTML = `<i class="fas fa-exclamation-triangle" style="margin-right:10px;"></i> ERROR - Chưa nhập đủ số`;
        else{
            var Result1 = recursiveModCalculator(A1,B1,C1);
            if(A1==0 && B1==0){
                p1.innerHTML = `<i class="fas fa-exclamation-triangle" style="margin-right:10px;"></i> ERROR - Làm gì có 0 mũ 0 ?`;
            }
            else if(C1==0){
                p1.innerHTML = `<i class="fas fa-exclamation-triangle" style="margin-right:10px;"></i>ERROR - số C phải khác 0`;
            }
            else if (Number.isSafeInteger(Result1) == true && Result1)
                {
                    p1.innerHTML = `${A1}^${B1} mod ${C1} = ${Result1}`;
                    document.getElementById("input-mod-calculator-A").value = "";
                    document.getElementById("input-mod-calculator-B").value = "";
                    document.getElementById("input-mod-calculator-C").value = "";
                }
            else p1.innerHTML = `<i class="fas fa-exclamation-triangle" style="margin-right:10px;"></i> ERROR - Ngoài phạm vi tính`;
        }
    }

    // A^B mod C
    recursiveModCalculator = (x,y,z) => {
        var p = null;
        var q = parseInt(y/2);
        if (y==0)
            return 1;
        else {
            p=parseInt(recursiveModCalculator(x,q,z));
            if (y%2==0) 
                return (p*p)%z;
            else
                return (p*p*x)%z;
        }
    }

    // check căn nguyên thủy
    modPrimitiveRoot2 = (A3,B3) => {
        var Result3 = B3-1;
        for(var i=1;i<Result3;i++){
            var check3 = recursiveModCalculator(A3,i,B3);
            if(check3 && check3==1){
                Result3 = i;
            }
            else
                Result3 = B3-1;
        }
        if(Result3!=B3-1){
            return false;
        }
        else if(Result3==B3-1)
            return true;
    }

    // tìm nghịch đảo
    modInverse2 = (A2,B2) => {
        var Result = null;
        for(var i=1;i<B2;i++){
            if((A2*i-1)%B2 == 0)
                Result = i;
        }
        if(Result != null) return Result;
    }
    
    // mã hóa RSA
    // đầu vào p,q là số nguyên tố
    // n = p*q
    // chọn e thỏa mãn: gcd (euler(n), e) = 1
    // d là nghịch đảo của e theo mod euler(n)
    // Khóa công khai PU = {e, n}
    // Khóa riêng PR = {d, n}
    // đầu vào bản rõ M < n
    // đầu ra bản mã C = M^e mod n
    // Giải mã: M = C^d mod n = bản rõ M đầu vào
    encryptRSA = () => {
        var pResult = document.getElementById("result-encrypt-RSA");
        var inputP = document.getElementById("input-encryptRSA-P5").value;
        var inputQ = document.getElementById("input-encryptRSA-Q5").value;
        var inputM = document.getElementById("input-encryptRSA-M5").value;
        var p = parseInt(inputP);
        var q = parseInt(inputQ);
        var M = parseInt(inputM);
        
        if(inputP=="" || inputQ=="" || inputM=="")
            pResult.innerHTML = `<i class="fas fa-exclamation-triangle" style="margin-right:10px;"></i> ERROR - Chưa nhập đủ số`;
        else if(primeNumber(q)==false)
            pResult.innerHTML = `<i class="fas fa-exclamation-triangle" style="margin-right:10px;"></i> ERROR - q không phải là số nguyên tố`;
        else if(primeNumber(p)==false)
            pResult.innerHTML = `<i class="fas fa-exclamation-triangle" style="margin-right:10px;"></i> ERROR - p không phải là số nguyên tố`;
        else if(M>p*q || M==p*q)
            pResult.innerHTML = `<i class="fas fa-exclamation-triangle" style="margin-right:10px;"></i> ERROR - M phải nhỏ hơn p*q`;
        else{
            var n = p*q;
            var eulerN = (p-1)*(q-1);
            var arrGCD = [];
            for(var i=1;i<eulerN;i++){
                if(i!=1 && gcd(eulerN,i) == 1)
                arrGCD.push(i);
            }
            if(arrGCD[2])
                e = arrGCD[1];
            else e = arrGCD[0];
            var d = modInverse2(e,eulerN);
            var C = recursiveModCalculator(M,e,n);
            var M2 = recursiveModCalculator(C,d,n);
            pResult.innerHTML = `<span style="color:green;">Sinh khóa <br>n = p*q = ${n} <br>Φ(n) = ${eulerN} <br> Chọn e NTCN với Φ(n) = ${e} <br>
            d ≡ e^-1(mod Φ(n)) = ${d} <br>PU = {e,n} = {${e},${n}} <br>PR = {d,n} = {${d},${n}}<br>
            Bản mã C = M^e mod n = ${C} </span> <br> Giải mã <br> M = C^d mod n = ${M2}`;
        }
    }
    
    //check số nguyên tố
    function primeNumber(n){
        if (n < 2){
            return false;
        }
        else{
            for(var i=2;i<n-1;i++){
                if (n%i == 0){
                    return false;
                }    
            }
        }
        return true;
    }

    // Trao đổi khoá Diffie-Hellman
    // đầu vào q là số nguyên tố
    // a là căn nguyên thủy của q
    // đầu vào khóa riêng xA < q
    // đầu vào khóa riêng xB < q
    // khóa công khai yA = a^xA mod q
    // khóa công khai yB = a^xB mod q
    // Alice chọn xA và gửi cho Bob yA
    // Bob chọn xB và gửi cho Alice yB
    // khi có yA và yB, sẽ tính ra được khóa K bí mật chung
    // khóa K = yB^xA mod q = yA^xB mod q
    encryptDiffieHellman = () => {
        var pResult = document.getElementById("result-encrypt-DH");
        var inputQ = document.getElementById("input-encryptDH-Q5").value;
        var inputA = document.getElementById("input-encryptDH-A5").value;
        var inputXA = document.getElementById("input-encryptDH-XA5").value;
        var inputXB = document.getElementById("input-encryptDH-XB5").value;
        var a = parseInt(inputA);
        var q = parseInt(inputQ);
        var xA = parseInt(inputXA);
        var xB = parseInt(inputXB);
        if(inputA=="" || inputQ=="" || inputXA=="" || inputXB=="")
            pResult.innerHTML = `<i class="fas fa-exclamation-triangle" style="margin-right:10px;"></i> ERROR - Chưa nhập đủ số`;
        else if(!primeNumber(q)){
            pResult.innerHTML = `<i class="fas fa-exclamation-triangle" style="margin-right:10px;"></i> ERROR - q không phải là số nguyên tố`;
        }
        else if(modPrimitiveRoot2(a,q) == false){
            pResult.innerHTML = `<i class="fas fa-exclamation-triangle" style="margin-right:10px;"></i> ERROR - a không phải là căn nguyên thủy của q <br> Hãy sử dụng chức năng Căn nguyên thủy trên Menu`;
        }
        else if(xA == q || xA > q){
            pResult.innerHTML = `<i class="fas fa-exclamation-triangle" style="margin-right:10px;"></i> ERROR - Xᴀ phải nhỏ hơn q`;
        }
        else if(xB == q || xB > q){
            pResult.innerHTML = `<i class="fas fa-exclamation-triangle" style="margin-right:10px;"></i> ERROR - Xʙ phải nhỏ hơn q`;
        }
        else{
            var yA = recursiveModCalculator(a,xA,q);
            var yB = recursiveModCalculator(a,xB,q);
            var K = recursiveModCalculator(yB,xA,q);
            pResult.innerHTML = `<span style="color:green;">Sinh khóa <br> Yᴀ = a^Xᴀ mod q = ${yA} <br>Yʙ = a^Xʙ mod q = ${yB} </span>
            <br>Khóa bí mật K = Yʙ^Xᴀ mod q = Yᴀ^Xʙ mod q = ${K}`
            //console.log(recursiveModCalculator(yA,xB,q));
        }
    }
 
    // Mật mã Elgaman
    // đầu vào q là số nguyên tố
    // a là căn nguyên thủy của q
    // đầu vào khóa riêng xA < q - 1
    // đầu vào bản gốc M < q
    // đầu vào k < q, k ngẫu nhiên
    // yA = a^xA mod q
    // đầu ra Khóa công khai: PU = {q, a, yA}
    // C1= a^k mod q
    // K = yA^k mod q
    // C2 = KM mod q
    // đầu ra Bản mã (C1, C2)
    // giải mã
    // K = C1^xA mod q
    // M = (C2 * K^-1) mod q
    encryptElgaman = () => {
        var pResult = document.getElementById("result-encrypt-E");
        var inputQ = document.getElementById("input-encryptE-Q7").value;
        var inputA = document.getElementById("input-encryptE-A7").value;
        var inputK = document.getElementById("input-encryptE-K7").value;
        var inputM = document.getElementById("input-encryptE-M7").value;
        var inputXA = document.getElementById("input-encryptE-XA7").value;
        var a = parseInt(inputA);
        var q = parseInt(inputQ);
        var xA = parseInt(inputXA);
        var k = parseInt(inputK);
        var M = parseInt(inputM);
        if(inputA=="" || inputQ=="" || inputXA=="" || inputK=="" || inputM=="")
            pResult.innerHTML = `<i class="fas fa-exclamation-triangle" style="margin-right:10px;"></i> ERROR - Chưa nhập đủ số`;
        else if(!primeNumber(q)){
            pResult.innerHTML = `<i class="fas fa-exclamation-triangle" style="margin-right:10px;"></i> ERROR - q không phải là số nguyên tố`;
        }
        else if(modPrimitiveRoot2(a,q) == false){
            pResult.innerHTML = `<i class="fas fa-exclamation-triangle" style="margin-right:10px;"></i> ERROR - a không phải là căn nguyên thủy của q <br> Hãy sử dụng chức năng Căn nguyên thủy trên Menu`;
        }
        else if(xA > q - 1){
            pResult.innerHTML = `<i class="fas fa-exclamation-triangle" style="margin-right:10px;"></i> ERROR - Xᴀ phải nhỏ hơn q-1`;
        }
        else if(M == q || M > q){
            pResult.innerHTML = `<i class="fas fa-exclamation-triangle" style="margin-right:10px;"></i> ERROR - M phải nhỏ hơn q`;
        }
        else if(k == q || k > q){
            pResult.innerHTML = `<i class="fas fa-exclamation-triangle" style="margin-right:10px;"></i> ERROR - k phải nhỏ hơn q`;
        }
        
        else{
            var yA = recursiveModCalculator(a,xA,q);
            var K1 = recursiveModCalculator(yA,k,q);
            var C1 = recursiveModCalculator(a,k,q);
            var KM = K1*M;
            var C2 = recursiveModCalculator(KM,1,q);
            var K2 = recursiveModCalculator(C1,xA,q);
            var inverseK = modInverse2(K1,q);
            var C2inverseK = C2 * inverseK;
            var M2 = recursiveModCalculator(C2inverseK,1,q);
            pResult.innerHTML = `<span style="color:green;">Sinh khóa: <br>Yᴀ = a^Xᴀ mod q = ${yA} <br> K = Yᴀ^k mod q = ${K1} <br>PU = {q, a, Yᴀ} = {${q},${a},${yA}} <br> 
            C₁ = a^k mod q = ${C1}<br> C₂ = K * M mod q = ${C2} <br> Bản mã (C₁,C₂) = (${C1},${C2}) <br></span>
            Giải mã: <br>Khóa bí mật K = C₁^Xᴀ mod q = ${K2} <br>Bản rõ: M = (C₂ * K^(-1)) mod q = ${M2}`;
        }
    }
    
    // thuật toán tìm nghịch đảo modulo tương tự Brute force
    modInverse = () => {
        var p2 = document.getElementById("result-mod-inverse");
        var inputA2 = document.getElementById("input-mod-inverse-A").value;
        var inputB2 = document.getElementById("input-mod-inverse-B").value;
        var A2 = parseInt(inputA2);
        var B2 = parseInt(inputB2);
        var Result2 = null;
        for(var i=1;i<B2;i++){
            if((A2*i-1)%B2 == 0)
                Result2 = i;
        }
        if(inputA2=="" || inputB2=="" )
            p2.innerHTML = `<i class="fas fa-exclamation-triangle" style="margin-right:10px;"></i>ERROR - Chưa nhập đủ số`;
        else {
            if(A2==0 || B2==0){
                p2.innerHTML = `<i class="fas fa-exclamation-triangle" style="margin-right:10px;"></i> ERROR - A và B phải khác 0`;
            }
            else if(Result2)
                p2.innerHTML = "NGHỊCH ĐẢO = " + Result2;
            else if(Result2 == null)
                p2.innerHTML = `<i class="fas fa-exclamation-triangle" style="margin-right:10px;"></i> ERROR - Không tồn tại nghịch đảo`;
        }
    }

    modPrimitiveRoot = () => {
        var p3 = document.getElementById("result-mod-primitive-root");
        var inputA3 = document.getElementById("input-mod-primitive-root-A").value;
        var inputB3 = document.getElementById("input-mod-primitive-root-B").value;
        var A3 = parseInt(inputA3);
        var B3 = parseInt(inputB3);
        var Result3 = B3-1;
        for(var i=1;i<Result3;i++){
            var check3 = recursiveModCalculator(A3,i,B3);
            if(check3 && check3==1){
                Result3 = i;
            }
            else
                Result3 = B3-1;
        }
        if(inputA3=="" || inputB3=="" )
            p3.innerHTML = `<i class="fas fa-exclamation-triangle" style="margin-right:10px;"></i> ERROR - Chưa nhập đủ số`;
        else if(primeNumber(B3) == false){
            p3.innerHTML = `<i class="fas fa-exclamation-triangle" style="margin-right:10px;"></i> ERROR - B không phải là số nguyên tố`;
        }
        else {
            if(Result3!=B3-1){
                p3.innerHTML = `KHÔNG - vì tồn tại <br> ${A3}^${Result3} mod ${B3} = 1`;
            }
            else if(Result3==B3-1)
                p3.innerHTML = `CÓ nha <i class="fas fa-heart ml-2"></i>`;
        } 
    }

    modLogarit = () => {
        var p4 = document.getElementById("result-mod-logarit");
        var inputA4 = document.getElementById("input-mod-logarit-A").value;
        var inputB4 = document.getElementById("input-mod-logarit-B").value;
        var inputC4 = document.getElementById("input-mod-logarit-C").value;
        var A4 = parseInt(inputA4);
        var B4 = parseInt(inputB4);
        var C4 = parseInt(inputC4);
        var Result4 = null;
        var check4 = recursiveModCalculator(B4,1,C4);
        for(var i=0;i<=C4-1;i++){
            if(recursiveModCalculator(A4,i,C4)==check4)
                Result4 = i;
        }
        if(inputA4=="" || inputB4=="" || inputC4=="")
            p4.innerHTML = `<i class="fas fa-exclamation-triangle" style="margin-right:10px;"></i> ERROR - Chưa nhập đủ số`;
        else if(A4==0 && B4==0){
            p4.innerHTML = `<i class="fas fa-exclamation-triangle" style="margin-right:10px;"></i> ERROR - Không có log₀ 0`;
        }
        else if(C4==0){
            p4.innerHTML = `<i class="fas fa-exclamation-triangle" style="margin-right:10px;"></i>ERROR - số c phải khác 0`;
        }
        else{
            if(Result4!=null)
                p4.innerHTML = `KẾT QUẢ = ${Result4}`;
            else if(Result4==null)
                p4.innerHTML = `<i class="fas fa-exclamation-triangle" style="margin-right:10px;"></i> ERROR - Không có kết quả`;
        }
    }
},false)