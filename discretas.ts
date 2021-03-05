//definicion de una clase
export class Discreta{

    uniforme=(k:number,variable:number,minimo?:number,maximo?:number,v?:number)=>{
        //funcion de flecha
        let fx=(variable:number)=>{
            if(variable>0 && variable<=k){
                return 1/k;
            }else{
                return 0;
            }
        }
        let sum=0;
        let i=0;
        let probabilidad=0;
        if(maximo && minimo){
            i=minimo;
            while(i<= maximo){
                sum=sum+fx(i);
                i++;
            }
            probabilidad=sum;
        }else if(maximo){
            i=1;
            while(i<= maximo){
                sum=sum+fx(i);
                i++;
            }
            probabilidad=sum;
        }else if(minimo){
            i=minimo;
            while(i<= k){
                sum=sum+fx(i);
                i++;
            }
            probabilidad=sum;
        }else{
            probabilidad=fx(variable);
        }
        //destructuracion
        let uniforme={
            probabilidad:probabilidad,
            media:this.esperanza(k,fx),
            varianza:this.varianza(k,fx)
        }
        if(v){
            this.imprimir(uniforme.probabilidad,uniforme.media,uniforme.varianza)
        }else{
            return uniforme;
        }
    }

    binomial=(x:number,n:number,p:number,minimo?:number,maximo?:number,v?:number)=>{
        //funcion de probabilidad
        let fx=(x:number)=>{
            if(x>=0 && x<=n){
                return this.nCr(n,x)*Math.pow(p,x)*Math.pow(1-p,n-x);
            }else{
                return 0;
            }
        };
        let sum=0;
        let i=0;
        let probabilidad=0;
        if(maximo && minimo){
            i=minimo;
            while(i<= maximo){
                sum=sum+fx(i);
                i++;
            }
            probabilidad=sum;
        }else if(maximo){
            i=0;
            while(i<= maximo){
                sum=sum+fx(i);
                i++;
                
            }
            probabilidad=sum;
        }else if(minimo){
            i=minimo;
            while(i<= n){
                sum=sum+fx(i);
                i++;
            }
            probabilidad=sum;
        }else{
            probabilidad=fx(x);
        }
        let binomial={
            probabilidad:probabilidad,
            media:this.esperanza(n,fx),
            varianza:this.varianza(n,fx)
        }
        if(v){
            this.imprimir(binomial.probabilidad,binomial.media,binomial.varianza)
        }else{
            return binomial;
        }
        
    }
    //Metodo para resolver combinatorias de elementos r<=n
    nCr=(n:number,r:number)=>this.factorial(n)/(this.factorial(n-r)*this.factorial(r))
    //Metodo para calcular el factorial de un numero
    factorial=(n:number)=>{
        let multip=0,ante=n;
        if(n==0)
            return 1;
        while(n>=1){
            n--;
            if(n>0){
                multip=n*ante;
            }else{
                multip=1*ante;
            }
            ante=multip;
        }
        return ante;
    }
    esperanza=(n:number,fx:any,aq?:number)=>{
        let sum=0,i=0;
        while(i<=n){
            if(aq==1){
                sum=sum+Math.pow(i,2)*fx(i);
            }else{
                sum=sum+i*fx(i);
            }
            i++;
        }
        return sum;
    }
    varianza=(n:number,fx:any)=>{
        return this.esperanza(n,fx,1)-Math.pow(this.esperanza(n,fx),2);
    }
    imprimir=(probabilidad:number,media:number,varianza:number)=>{
        console.log("La probabilidad es de: ",probabilidad," su media es de: ",media," y varianza de: ",varianza);
    }
}
