import react,{useState} from 'react'
import '../App.css';
import './listcards.css'

function Card() {
  const [count,setCount]=useState(['','','',''])
  const [cardList,setCardlist]=useState([])
  const handleinput=(e)=>{
    const ipvalue=e.target.value.split(' ').join('')
    console.log(ipvalue)
    if(ipvalue.length>16){
      alert('invalid card number')
      document.querySelector('input').value=''
    }
    if((ipvalue).length>4 && (ipvalue).length<=16){
      console.log('more')
      var boxes=Number(((ipvalue).length)/4)
      var i=4
      var d=1
      while (boxes>0 && d<4){
        const arr=[...count]
        const b1=ipvalue.slice(i,i+4)
        document.getElementById(d).value=b1
        //document.getElementById(d).focus()
        count[d]=b1
        setCount(count)
        console.log(count)
        boxes=boxes-1
        i=i+4
        d=d+1
      }
      document.getElementById('0').value=e.target.value.slice(0,4)
      document.getElementById(d-1).focus()
      console.log(d)
      count[0]=e.target.value.slice(0,4)
      setCount(count)
      console.log(count)
    }
    else{
      const iplen=(e.target.value).length
      //console.log('1st',count+' '+e.target.value)
      const cardno=e.target.value
      if (iplen===4){
        const arr=[...count]
        arr[e.target.id]=cardno
        setCount(arr)      
        //console.log('hello',count,e.target.id)
        if(e.target.id<3){
          document.getElementById(Number(e.target.id)+1).focus()
        }
        else{
          const arr=[...count]
          arr[3]=cardno
          setCount(arr)
          document.getElementById('00').focus()
          console.log('count',arr,count)
        }
      }   
    }
  }
  const handleSubmit=async()=>{
    const card=count[0]+' '+count[1]+' '+count[2]+' '+count[3]
    console.log('card',card)
    if(count[0]!=='' && count[1]!=='' && count[2]!=='' && count[3]!=='' ){
        
        const cardlist=[...cardList,card]
        //cardlist.push(card)
        await setCardlist(cardlist)
    }
    console.log('cardlist',cardList)
    document.querySelectorAll('input').forEach(input=>{input.value=''})
    document.getElementById('0').focus()
    setCount(['','','',''])


  }
  const handleDeleteButton=(e)=>{
      console.log(cardList,cardList[e.target.id])
      var arr=[...cardList]
      arr=arr.filter(each=>{return each!==arr[e.target.id]})
      setCardlist(arr)
  }
  return (
    <div >
        <h1>Display Card numbers</h1>
      <div className="App">
        {/* <h2>your card no :</h2> */}
        <p>enter cred card no</p>
      <input id='0' type="number" className="ipfeild"  onChange={handleinput}  autoFocus></input>
      <input id='1' type="number" className="ipfeild" maxLength='4' onChange={handleinput} ></input>
      <input id='2' type="number" className="ipfeild" maxLength='4' onChange={handleinput} ></input>
      <input id='3' type="number" className="ipfeild" maxLength='4' onChange={handleinput} ></input>
      <button className="deleteButton" id='00' type="submit" onClick={handleSubmit} >Submit</button>
      </div>
    {cardList.length>0 && <div>
        <div className="list">
            <table>
                <thead>
                    <tr>
                        <th>Card no</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {cardList.map((each,ind)=>{
                        return(
                            <tr key={ind} style={{textAlign:"center"}}>
                                <td >{each}</td>
                                <td><button id={ind} onClick={handleDeleteButton}>Delete</button></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
      </div>}
     
    </div>
  );
}

export default Card;
//1234123412341234