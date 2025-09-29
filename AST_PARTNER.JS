// SPDX-License-Identifier: MIT

pragma solidity ^0.8.13;

library SafeMath {

    function add(uint256 a, uint256 b) internal pure returns (uint256) {
        uint256 c = a + b;
        require(c >= a, "SafeMath: addition overflow");
        return c;
    }

    function sub(uint256 a, uint256 b) internal pure returns (uint256) {
        return sub(a, b, "SafeMath: subtraction overflow");
    }

    function sub(uint256 a, uint256 b, string memory errorMessage) internal pure returns (uint256) {
        require(b <= a, errorMessage);
        uint256 c = a - b;
        return c;
    }

    function mul(uint256 a, uint256 b) internal pure returns (uint256) {
        if (a == 0) { return 0; }
        uint256 c = a * b;
        require(c / a == b, "SafeMath: multiplication overflow");
        return c;
    }

    function div(uint256 a, uint256 b) internal pure returns (uint256) {
        return div(a, b, "SafeMath: division by zero");
    }

    function div(uint256 a, uint256 b, string memory errorMessage) internal pure returns (uint256) {
        require(b > 0, errorMessage);
        uint256 c = a / b;
        return c;
    }
}



interface IERC20 {
    function totalSupply() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
    function transfer(address recipient, uint256 amount) external returns (bool);
    function allowance(address owner, address spender) external view returns (uint256);
    function approve(address spender, uint256 amount) external returns (bool);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
}


abstract contract ReentrancyGuard {
    // Booleans are more expensive than uint256 or any type that takes up a full
    // word because each write operation emits an extra SLOAD to first read the
    // slot's contents, replace the bits taken up by the boolean, and then write
    // back. This is the compiler's defense against contract upgrades and
    // pointer aliasing, and it cannot be disabled.

    // The values being non-zero value makes deployment a bit more expensive,
    // but in exchange the refund on every call to nonReentrant will be lower in
    // amount. Since refunds are capped to a percentage of the total
    // transaction's gas, it is best to keep them low in cases like this one, to
    // increase the likelihood of the full refund coming into effect.
    uint256 private constant _NOT_ENTERED = 1;
    uint256 private constant _ENTERED = 2;

    uint256 private _status;

    constructor ()  {
        _status = _NOT_ENTERED;
    }

    /**
     * @dev Prevents a contract from calling itself, directly or indirectly.
     * Calling a `nonReentrant` function from another `nonReentrant`
     * function is not supported. It is possible to prevent this from happening
     * by making the `nonReentrant` function external, and make it call a
     * `private` function that does the actual work.
     */
    modifier nonReentrant() {
        // On the first call to nonReentrant, _notEntered will be true
        require(_status != _ENTERED, "ReentrancyGuard: reentrant call");

        // Any calls to nonReentrant after this point will fail
        _status = _ENTERED;

        _;

        // By storing the original value once again, a refund is triggered (see
        // https://eips.ethereum.org/EIPS/eip-2200)
        _status = _NOT_ENTERED;
    }

    modifier isHuman() {
        require(tx.origin == msg.sender, "sorry humans only");
        _;
    }
}




interface IPancakeRouter01 {
    function factory() external pure returns (address);

    function WETH() external pure returns (address);

    function addLiquidity(
        address tokenA,address tokenB,uint amountADesired,uint amountBDesired,
        uint amountAMin,uint amountBMin,address to,uint deadline
    ) external returns (uint amountA, uint amountB, uint liquidity);

    function addLiquidityETH(
        address token,uint amountTokenDesired,uint amountTokenMin,
        uint amountETHMin,address to,uint deadline
    ) external payable returns (uint amountToken, uint amountETH, uint liquidity);

    function removeLiquidity(
        address tokenA, address tokenB, uint liquidity, uint amountAMin,
        uint amountBMin, address to, uint deadline
    ) external returns (uint amountA, uint amountB);

    function removeLiquidityETH(
        address token, uint liquidity, uint amountTokenMin, uint amountETHMin,
        address to, uint deadline
    ) external returns (uint amountToken, uint amountETH);

    function removeLiquidityWithPermit(
        address tokenA, address tokenB, uint liquidity,
        uint amountAMin, uint amountBMin,address to, uint deadline,
        bool approveMax, uint8 v, bytes32 r, bytes32 s
    ) external returns (uint amountA, uint amountB);

    function removeLiquidityETHWithPermit(
        address token, uint liquidity, uint amountTokenMin,
        uint amountETHMin, address to, uint deadline,
        bool approveMax, uint8 v, bytes32 r, bytes32 s
    ) external returns (uint amountToken, uint amountETH);

    function swapExactTokensForTokens(
        uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline
    ) external returns (uint[] memory amounts);

    function swapTokensForExactTokens(
        uint amountOut, uint amountInMax, address[] calldata path, address to, uint deadline
    ) external returns (uint[] memory amounts);

    function swapExactETHForTokens(uint amountOutMin, address[] calldata path, address to, uint deadline)
    external payable returns (uint[] memory amounts);

    function swapTokensForExactETH(uint amountOut, uint amountInMax, address[] calldata path, address to, uint deadline)
    external returns (uint[] memory amounts);

    function swapExactTokensForETH(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline)
    external returns (uint[] memory amounts);

    function swapETHForExactTokens(uint amountOut, address[] calldata path, address to, uint deadline)
    external payable returns (uint[] memory amounts);

    function quote(uint amountA, uint reserveA, uint reserveB) external pure returns (uint amountB);

    function getAmountOut(uint amountIn, uint reserveIn, uint reserveOut) external pure returns (uint amountOut);

    function getAmountIn(uint amountOut, uint reserveIn, uint reserveOut) external pure returns (uint amountIn);

    function getAmountsOut(uint amountIn, address[] calldata path) external view returns (uint[] memory amounts);

    function getAmountsIn(uint amountOut, address[] calldata path) external view returns (uint[] memory amounts);
}

interface IPancakeRouter02 is IPancakeRouter01 {
    function removeLiquidityETHSupportingFeeOnTransferTokens(
        address token, uint liquidity,uint amountTokenMin,
        uint amountETHMin,address to,uint deadline
    ) external returns (uint amountETH);

    function removeLiquidityETHWithPermitSupportingFeeOnTransferTokens(
        address token,uint liquidity,uint amountTokenMin,
        uint amountETHMin,address to,uint deadline,
        bool approveMax, uint8 v, bytes32 r, bytes32 s
    ) external returns (uint amountETH);

    function swapExactTokensForTokensSupportingFeeOnTransferTokens(
        uint amountIn,uint amountOutMin,
        address[] calldata path,address to,uint deadline
    ) external;

    function swapExactETHForTokensSupportingFeeOnTransferTokens(
        uint amountOutMin,address[] calldata path,address to,uint deadline
    ) external payable;

    function swapExactTokensForETHSupportingFeeOnTransferTokens(
        uint amountIn,uint amountOutMin,address[] calldata path,
        address to,uint deadline
    ) external;
}

contract BDSMiner is ReentrancyGuard {

    using SafeMath for uint256;
	

    uint256 public ethIDO = 3*10 ** 17;

	
	
	
	
	
    uint256 public ethPartner  = 10 ** 18;  

    uint256 public claimIDO =  10000* 10 ** 18;    
	
    uint256 private claimPartner  = 0;  


    uint256 private power1  = 2;
    uint256 private power2  = 1;
    uint256 private power3  = 0;
	
    uint256 private dayout  = 60;
    uint256 private minhold = 10 ** 18;
    uint256 public partners  = 0; //partners num
    uint256 public miners  = 0;


    uint256 private levelnum1  = 5;
    uint256 private levelnum2  = 15;
    uint256 private levelnum3  = 30;	


    uint256 public IDO_AMOUNT1 = 33*10 ** 18; //1	
    uint256 public IDO_AMOUNT2 = 99*10 ** 18;//3
    uint256 public IDO_AMOUNT3 = 198*10 ** 18;//6

    uint256 public IDO_AMOUNT4 = 298*10 ** 18;//9 //vip PARTNER
	

    uint256 private levelref1  = 10;
    uint256 private levelref2  = 3;
    uint256 private levelref3  = 2;	

	uint256  public _normal_percent; 
	uint256[] public _level1_percent; 
	uint256[] public _level2_percent; 
	uint256[] public _level3_percent; 
	uint256[] public _level4_percent; 
	uint256[] public _level5_percent; 	

    uint256 private levelNFT1  = 19;
    uint256 private levelNFT2  = 199;
    uint256 private levelNFT3  = 1999;	
	
	
    uint256 private NFT1rate  = 20;
    uint256 private NFT2rate  = 10;
    uint256 private NFT3rate  = 5;
    uint256 private NFT4rate  = 2;	

    uint256 public bonus  = 100* 10 ** 18; 		

    uint256 public sttime  = block.timestamp;
    uint256 public edtime  = block.timestamp+86400*10;    

    uint256 public IDOsttime  = block.timestamp;
    uint256 public IDOedtime  = block.timestamp+86400*10;  
    uint256 public TXtime  = block.timestamp+86400*10;     

    uint256 public totalSupply  = 0;

    uint256 public stakes  = 0;
    uint256 public stakesLP  = 0;
	
    uint256 public unstakeNum  = 10;    
    uint256 public PartnerRef  = 10;      
    uint256 public IDORef  = 5;  

    uint256 public durations = 86400;
    address public _USDT     = 0x55d398326f99059fF775485246999027B3197955;
    address public _BONUS     = 0x55d398326f99059fF775485246999027B3197955;
    address public _NFT   = 0x865bfde337C8aFBffF144Ff4C29f9404EBb22b15;	
	
    address public _BDS     = 0x874f770241366d0621913a06A80747Fe84705241;
    address public _BDSLP   = 0x1615249360a894a52de02a3e84fDA9aa4F41Be17;
    address public _router   = 0x865bfde337C8aFBffF144Ff4C29f9404EBb22b15;
	
    address public _backAddr;
    address public _backLp;

    //     0 ispartner 1 isunstake 2  stakeNum  3 startTime  4 unStakeTime  5 inviteNum  6  inviteNumIDO 7 isIDO 8 canClaim 9 jifen  10 index 11 claimedTotal  12 baseClaim

    mapping (address => uint256[16]) public data;  

    mapping (address => address[])  public team1; // user -> teams1
    mapping (address => address[])  public team2; // user -> teams2
    mapping (address => address[])  public team3; // user -> teams2
    mapping (address => address[])  public team4; // user -> teams2
    mapping (address => address[])  public team5; // user -> teams2
    mapping (address => address[])  public team6; // user -> teams2

    mapping (address => address[])  public partnersVIP; // user -> teams2    
    mapping (address => address[])  public partnersVIP1; // user -> teams2
    mapping (address => address[])  public partnersVIP2; // user -> teams2
    mapping (address => address[])  public partnersVIP3; // user -> teams2
        
    mapping (address => address)    public boss;  // user -> boss
    mapping (address => bool)       private role;  // user -> true
    mapping (address => bool)       private mine;
    mapping (address => bool)       public partner; //yes partner  or no ?
    mapping (address => bool)       public partnerUNS; //unstake yes  or no ?

 

	address[] public usersAddr;       

	uint256[] public usersJifen; 
	

    constructor() {
        role[_msgSender()] = true;
        _backAddr = _msgSender();
        _backLp = _msgSender();
		data[_msgSender()][0] = 3;

        usersAddr.push(_msgSender());//更新 usersAddr
        usersJifen.push(9); 
        
        //IERC20(_USDT).approve(_router, 99 * 10**75);
        //IERC20(_BDS).approve(_router, 99 * 10**75);
    }

    function _msgSender() internal view virtual returns (address) {
        return msg.sender;
    }

    function hasRole(address addr) public view returns (bool) {
        return role[addr];
    }

    function setRole(address addr, bool val) public {
        require(hasRole(_msgSender()), "must have role");
        role[addr] = val;
    }

	function unlock(address con, address addr, uint256 val) public {
        require(hasRole(_msgSender()) && addr != address(0)  && addr != address(0x000000000000000000000000000000000000dEaD));
        if (con == address(0)) {payable(addr).transfer(val);} 
        else {IERC20(con).transfer(addr, val);}
	}

    function getTeam1(address addr) public view returns (address[] memory) {
        return team1[addr];
    }

    function getTeam2(address addr) public view returns (address[] memory) {
        return team2[addr];
    }

    function getTeam3(address addr) public view returns (address[] memory) {
        return team3[addr];
    }

    function getTeam4(address addr) public view returns (address[] memory) {
        return team4[addr];
    }

    function getTeam5(address addr) public view returns (address[] memory) {
        return team5[addr];
    }

    function getTeam6(address addr) public view returns (address[] memory) {
        return team6[addr];
    }    

    function getTeamNum(address addr) public view returns (uint256[6] memory) {

        return [team1[addr].length, team2[addr].length, team3[addr].length, team4[addr].length,team5[addr].length,team6[addr].length];

    }

     function getPartner() public view returns (uint256) {
        return partners;
    }    

    // function getData(address addr) public view returns (uint256[29] memory, address[4] memory) {
    //     uint256 invite = sumInvitePower(addr);
    //     uint256 claim;
    //     uint256 chanliang;
    //     (claim,chanliang) = getClaim(addr, invite);
    //     uint256[29] memory arr = [invite, claim, chanliang, ethIDO, power1, power2, power3, 
    //         dayout, minhold, miners, stakes, data[addr][0], data[addr][1], data[addr][3], 
    //         data[addr][4], data[addr][5], data[addr][6], data[addr][7], data[addr][8], 
    //         team1[addr].length, team2[addr].length, 0, 
    //         totalSupply(), 
    //         IERC20(_BDS).balanceOf(addr), 
    //         IERC20(_USDT).balanceOf(address(this)), 
    //         IERC20(_USDT).allowance(addr, address(this)),
    //         IERC20(_BDSLP).balanceOf(addr), 
    //         IERC20(_BDSLP).allowance(addr, address(this)),
    //         IERC20(_USDT).balanceOf(addr)];
    //     return (arr, [boss[addr], _backAddr, _USDT, _BDSLP]);
    // }

    function getData(address addr) public view returns (uint256[22] memory) {
 
        uint256[22] memory arr = [data[addr][0], data[addr][1], data[addr][2], data[addr][3], 
            data[addr][4], data[addr][5], data[addr][6], data[addr][7], data[addr][8], data[addr][9], data[addr][10], data[addr][11], data[addr][12],sttime,edtime,IDOsttime,IDOedtime,partners,TXtime,team1[addr].length, team2[addr].length, team3[addr].length];

        return arr;
    }

    function getVIPData() public view returns (address[] memory) {
 

        address[] memory arr = partnersVIP[address(this)];
            
        return arr;

    }


    function getVIP1Data() public view returns (address[] memory) {
 

        address[] memory arr = partnersVIP1[address(this)];
            
        return arr;

    }



    function getVIP2Data() public view returns (address[] memory) {
 

        address[] memory arr = partnersVIP2[address(this)];
            
        return arr;

    }


 
    function getVIP3Data() public view returns (address[] memory) {
 

        address[] memory arr = partnersVIP3[address(this)];
            
        return arr;

    }   


    function getRef(address addr) public view returns (address) {
 

        address ref = boss[addr];
            
        return ref;

    }


    
    // function totalSupply() private view returns(uint256) {
        // return IERC20(_BDS).totalSupply() - IERC20(_BDS).balanceOf(address(this));
    // }

    function setFee(uint256[] memory confs) public {
        require(hasRole(_msgSender()), "must have role");
        ethIDO  = confs[0];
        ethPartner  = confs[1];
        claimIDO  = confs[2];
        claimPartner  = confs[3]; 
        IDO_AMOUNT4   = confs[4];	//VIP PARTNER	
		
    }    



    function setIsPart(address addr, uint256 isPartner) public {
        require(hasRole(_msgSender()), "must have role");
        data[addr][0] = isPartner;
    }

    function setData(uint256[] memory confs) public {
        require(hasRole(_msgSender()), "must have role"); 
        unstakeNum  = confs[0];         
        sttime   = confs[1];
        edtime   = confs[2];
        IDOsttime   = confs[3];
        IDOedtime   = confs[4];  
        PartnerRef  = confs[5];
        IDORef  = confs[6];
        TXtime   = confs[7];  

    }
	


    function setNum(uint256[] memory confs) public {
        require(hasRole(_msgSender()), "must have role"); 
		
        levelnum1  = confs[0];         
        levelnum2   = confs[1];
        levelnum3   = confs[2];

        levelref1   = confs[3];
        levelref2   = confs[4];
        levelref3   = confs[5];		

        IDO_AMOUNT1   = confs[6];
        IDO_AMOUNT2   = confs[7];
        IDO_AMOUNT3   = confs[8];	
		
		bonus = confs[9];	
		
        levelNFT1   = confs[10];
        levelNFT2   = confs[11];
        levelNFT3   = confs[12];	

        NFT1rate   = confs[13];
        NFT2rate   = confs[14];
        NFT3rate   = confs[15];	
        NFT4rate   = confs[16];		
 

    }	
	
    
    function setBack(address back, address backlp) public {
        require(hasRole(_msgSender()), "must have role");
        _backAddr = back;
        _backLp = backlp;
    }


    function setToken(address token,address BONUS,address NFT) public {
        require(hasRole(_msgSender()), "must have role");
        _BDS = token;
		_BONUS = BONUS;
		_NFT = NFT;		
    }


    receive() external payable {}

    // function getClaim(address addr, uint256 invitePower) public view returns(uint256, uint256) {
    //     uint256 claimNum = data[addr][2];
    //     uint256 etime = data[addr][5];
        
    //     uint256 chanlinag = dayout - (totalSupply() / 10 ** 18 - 3000000) / 3000000 * 10;
        
    //     // plus mining claim
    //     if (data[addr][0] > 0 && etime > data[addr][1]) {
    //         uint256 power = 100 + data[addr][6] + invitePower;
            
    //         if (etime > block.timestamp) {
    //             etime = block.timestamp;
    //         }
            
    //         // * power / 100
    //         // * (etime - data[addr][1]) / 86400
    //         claimNum += chanlinag * 10 ** 18  * power * (etime - data[addr][1]) / 100 / durations;
    //     }
        
    //     return (claimNum, chanlinag);
    // }
    
    function sumInvitePower(address addr) public view returns (uint256) {
        uint256 total = team1[addr].length * power1 + team2[addr].length * power2;
        return total;
    }

    function _swapTokenForToken(uint256 tokenAmount) private {
        address[] memory path = new address[](2);
        path[0] = _USDT;path[1] = address(this);
        IPancakeRouter02(_router).swapExactTokensForTokensSupportingFeeOnTransferTokens(
            tokenAmount, 0, path, payable(_backAddr), block.timestamp);
    }

    function addLiquidity2(uint256 t1, uint256 t2) private {
        IPancakeRouter02(_router).addLiquidity(_BDS, 
            _USDT, t1, t2, 0, 0, _backLp, block.timestamp);
    }



	function divideUSDT(address invite,uint256 amount,uint256 level) private {
	

			if(data[invite][0]==1||data[invite][0]==2||data[invite][0]==3){


			data[invite][9] +=  amount *_level1_percent[level]/100 ;
				
			//payable(invite).transfer(amount * levelref1 / 200);
			IERC20(_USDT).transfer(invite, amount.mul(_level1_percent[level] / 100));			
			
			
			}

			else if(data[invite][0]==4){
			//payable(invite).transfer(amount * levelref1 / 100);
			//tuijian jifen
			data[invite][9] +=  amount *_level4_percent[level]/100 ;
			IERC20(_USDT).transfer(invite, amount.mul(_level4_percent[level] / 100));				
			
			}
			

			else if(data[invite][0]==5){
			//payable(invite).transfer(amount * levelref1 / 100);
			//tuijian jifen
			data[invite][9] +=  amount *_level5_percent[level]/100 ;
			IERC20(_USDT).transfer(invite, amount.mul(_level5_percent[level] / 100));				
			
			} else {
				
				
				
			}	
 

			usersJifen[data[invite][10]]	=  data[invite][9];		
	
	
}



    function doIDO(address invite,uint256 amount) public payable {

        // IERC20(_BDSLP).transferFrom(_msgSender(), address(this), amount);
        // data[_msgSender()][7] += amount;
        // data[_msgSender()][8] = 0;
        //uint256 amount = msg.value;

        require(amount >= IDO_AMOUNT1 ,"ERROR Insufficient payment");   

		data[_msgSender()][10] = usersAddr.length;//index
		usersAddr.push(_msgSender());//更新 usersAddr

        require(data[_msgSender()][0] ==0 ,"ERROR  have participated");  //limit once
		
		
		require(IERC20(_USDT).balanceOf(_msgSender()) >= amount ,"ERROR Insufficient");   
		

		IERC20(_USDT).transferFrom(_msgSender(), address(this), amount);
				

        require(block.timestamp >= IDOsttime && block.timestamp < IDOedtime  ,"ERROR Out of time");                

        if (boss[_msgSender()] == address(0) && _msgSender() != invite && invite != address(0)) {
            boss[_msgSender()] = invite;
            team1[invite].push(_msgSender());


            if(team1[invite].length==levelnum1){

            partnersVIP1[address(this)].push(invite);

            }

            if(team1[invite].length==levelnum2){

            partnersVIP2[address(this)].push(invite);

            }

            if(team1[invite].length==levelnum3){

            partnersVIP3[address(this)].push(invite);

            }

			


            if(data[invite][0]>0) {


			//ref1 USDT
			divideUSDT(invite,amount,0);
			
			

            }else{
			//_normal_percent

			
			IERC20(_USDT).transfer(invite, amount.mul(_normal_percent / 100));					
				
				
				
			}
			
			
            
			
			//REF LV2
            address invite2 = boss[invite];
            if (invite2 != address(0) && data[invite2][0]>0 ) {
                team2[invite2].push(_msgSender());
                //data[invite2][8] += claimIDO*levelref2/100; //REF LV2
				
 
			//ref2 USDT
			divideUSDT(invite2,amount,1);
 
				
            }else{
			//_backAddr

			
			IERC20(_USDT).transfer(_backAddr, amount.mul(_level5_percent[1] / 100));					
				
				
				
			}	
			
			


			//REF LV3
            address invite3 = boss[invite2];
			
            if (invite3 != address(0) && data[invite3][0]>=4 ) {
                team3[invite3].push(_msgSender());
                //data[invite3][8] += claimIDO+100; //REF LV3
 
			//ref3 USDT
			divideUSDT(invite3,amount,2);
 
				
            } else{
			//_backAddr

			
			IERC20(_USDT).transfer(_backAddr, amount.mul(_level5_percent[2] / 100));					
				
				
				
			}
			
			
			
			
			
			

        }


			//IDO level 
            if(amount==IDO_AMOUNT1){

			data[_msgSender()][0] = 1;	

            }

            if(amount==IDO_AMOUNT2){

			data[_msgSender()][0] = 2;	

            }

            if(amount==IDO_AMOUNT3){

			data[_msgSender()][0] = 3;	

            }
			
            if(amount==IDO_AMOUNT4){

			data[_msgSender()][0] = 4;	//VIP PARTNER

            }			
			
			
		// 累计积分
		usersJifen.push(0);
		
 
		
		// uint256 rate = 1;
		
		// uint256 rate2 =  IDO_AMOUNT2/IDO_AMOUNT1;
		
		// uint256 rate3 =  IDO_AMOUNT3/IDO_AMOUNT1;
		
		// uint256 rate4 =  IDO_AMOUNT4/IDO_AMOUNT1;		
		
		// 之前所有参与的奖励
		
		// for(uint256 i=0;i<usersAddr.length-1;i++){
			
		// if(data[usersAddr[i]][0]==1){ rate =  1;  }	
		// if(data[usersAddr[i]][0]==2){ rate =  rate2;  }	
		// if(data[usersAddr[i]][0]==3){ rate =  rate3;  }
		// if(data[usersAddr[i]][0]>=4){ rate =  rate4;  }
		
		// //canClaim
		// data[usersAddr[i]][8]+= bonus * rate;	
		
 
			
		// }		
		
		
        data[_msgSender()][7] = 1; //is ido
		
        //data[_msgSender()][3] = block.timestamp; //startTime
		
        data[invite][6] += 1; // inviteNum + 1
		
        uint256 claim = claimIDO.mul(amount.div(IDO_AMOUNT1));
		
		data[_msgSender()][12] += claim; //12 baseCLAIM  
		
        data[_msgSender()][8] += claim; //8 CANCLAIM      


		
        

        miners += 1;

    }   


    //     0 ispartner 1 isunstake 2  stakeNum  3 startTime  4 unStakeTime  5 inviteNum  6  inviteNumIDO 7 isIDO 8 canClaim 9 jifen  10 index 11 claimedTotal  12 baseClaim


     function setInviteJifen(address user,address invite,uint256 jifen ) public {
        require(hasRole(_msgSender()), "must have role"); 

		boss[user] = invite;
		
		usersJifen[data[user][10]]	=  jifen;	
		
		data[user][9] =  jifen ;


	 }		
	

     function setPercent(uint256 normal_percent,uint256[] memory level1_percent,uint256[] memory level2_percent,uint256[] memory level3_percent,uint256[] memory level4_percent,uint256[] memory level5_percent) public {
        require(hasRole(_msgSender()), "must have role"); 
		
		_normal_percent = normal_percent;
		_level1_percent = level1_percent;
		_level2_percent = level2_percent;
		_level3_percent = level3_percent;
		_level4_percent = level4_percent;
		_level5_percent = level5_percent;		

	 }		
	
	
     function setWhite(address user,address invite,uint256[] memory confs) public {
        require(hasRole(_msgSender()), "must have role"); 

		boss[user] = invite;
		
		//ref bonus

			
			
        miners += 1;
		
		require(data[user][0] ==0, "must new address"); 
		
		data[user][0] = 5;	//WHITE
		

		data[user][10] = usersAddr.length;//index
		usersAddr.push(user);//更新 usersAddr
		
		
		// 累计积分
		usersJifen.push(0);

        uint256 claim = confs[0];

		data[user][12] += claim; //12 baseCLAIM  
		
        data[user][8] += claim; //8 CANCLAIM     
		
        data[user][7] = 1;

		data[user][9] = 0;
		
 
 

    }	

     function setUser(address user,address invite,uint256[] memory confs) public {
        require(hasRole(_msgSender()), "must have role"); 

		boss[user] = invite;
		
		//ref bonus
 
		
		//data[user][0] = 1;	
		

		// data[user][10] = usersAddr.length;//index
		// usersAddr.push(user);//更新 usersAddr

		for(uint256 i=0;i<16;i++){
		
		data[user][i] = confs[i];	
 
			
		}	
     
 
 	
 

    }	
	
	

    function getTotalSupply() public view returns (uint256) {

        uint256 totalnum = 0;

		for(uint256 i=0;i<usersAddr.length;i++){
		
		totalnum += data[usersAddr[i]][8] ;	
 
			
		}	

		return 	totalnum;
		
	}	
	
    

//    0 ispartner 1 isunstake 2  stakeNum  3 startTime  4 unStakeTime  5 inviteNum  6  inviteNumIDO 7 isIDO 8 canClaim


    // function unstakeBNB() public payable nonReentrant {

        // uint256 amount =  data[_msgSender()][2] ;  

        // require(amount>0  && data[_msgSender()][1] == 0  && data[_msgSender()][6] >= unstakeNum,"ERROR");              


        // data[_msgSender()][1] = 1; //isunstake
        // data[_msgSender()][2] = 0; //stakeNum 
        // data[_msgSender()][4] = block.timestamp;


        

        // stakes -= amount;
        // payable(_msgSender()).transfer(amount);

    // }


 


    function doClaim(address invite) public nonReentrant payable {

        uint256 canClaim = data[_msgSender()][12];


			
        require(block.timestamp >=  TXtime  ,"ERROR Out of time");                


        if (canClaim >= 0) {

			data[_msgSender()][11] += canClaim ;		
		
            IERC20(_BDS).transfer(_msgSender(), canClaim);
            
            data[_msgSender()][12] = 0;
			


        }

    }


     function getBlance() public view returns (uint256) {


        uint256 canClaim = data[_msgSender()][8]-data[_msgSender()][11];
        return canClaim;


    }




/*
    function doStart(address invite) public payable {
        
        if (boss[_msgSender()] == address(0) && _msgSender() != invite && invite != address(0)) {
            boss[_msgSender()] = invite;
            team1[invite].push(_msgSender());
            
            address invite2 = boss[invite];
            if (invite2 != address(0)) {
                team2[invite2].push(_msgSender());
            }
        }
        
        transferFist();

        if (data[_msgSender()][0] > 0) {
            uint256 claim;
            (claim,) = getClaim(_msgSender(), sumInvitePower(_msgSender()));
            data[_msgSender()][2] = claim;
        }
        
        data[_msgSender()][0] = block.timestamp;
        data[_msgSender()][1] = block.timestamp;
        data[_msgSender()][5] = block.timestamp +  durations;

        if (!mine[_msgSender()]) {
            mine[_msgSender()] = true;
            miners++;
        }
    }
    
    function doClaim() public {
        uint256 canClaim;
        (canClaim,) = getClaim(_msgSender(), sumInvitePower(_msgSender()));
        
        if (canClaim > 0) {
            IERC20(_BDS).transfer(_msgSender(), canClaim);
            
            data[_msgSender()][1] = block.timestamp;
            data[_msgSender()][2] = 0;
        }
        
        transferFist();
    }

    function transferFist() private {
        // 15% admin
        IERC20(_USDT).transferFrom(_msgSender(), _backAddr, ethIDO * 15 / 100);
        // 50% stake
        IERC20(_USDT).transferFrom(_msgSender(), address(this), ethIDO * 70 / 100);
        // 20% flow
        addLiquidity2(IERC20(_BDS).balanceOf(address(this)), ethIDO * 20 / 100);
        address parent = boss[_msgSender()];
        if (parent != address(0)) {
            IERC20(_USDT).transferFrom(_msgSender(), parent, ethIDO * 10 / 100);
            parent = boss[parent];
            if (parent != address(0)) {
                IERC20(_USDT).transferFrom(_msgSender(), parent, ethIDO * 5 / 100);
            } else {
                IERC20(_USDT).transferFrom(_msgSender(), _backAddr, ethIDO * 5 / 100);
            }
        } else {
            IERC20(_USDT).transferFrom(_msgSender(), _backAddr, ethIDO * 15 / 100);
        }
    }
	
*/	


    function setbaseClaimNum(address[] memory accounts,  uint256[] memory amount) public  {


        require(hasRole(_msgSender()), "must have role"); 
 
        require(accounts.length==amount.length, "ERROR not pair"); 
		
		for(uint256 i=0;i<accounts.length;i++){


			data[accounts[i]][12] = amount[i];	
 
			
		}	

 
		
	}
	
	

    function setcanClaimNum(address[] memory accounts,  uint256[] memory amount) public  {


        require(hasRole(_msgSender()), "must have role"); 
 
        require(accounts.length==amount.length, "ERROR not pair"); 
		
		for(uint256 i=0;i<accounts.length;i++){


			data[accounts[i]][8] = amount[i];	
 
			
		}	

 
		
	}
	
	


    function setstakeNum(address[] memory accounts,  uint256[] memory amount) public  {


        require(hasRole(_msgSender()), "must have role"); 
 
        require(accounts.length==amount.length, "ERROR not pair"); 
		
		for(uint256 i=0;i<accounts.length;i++){


			data[accounts[i]][2] = amount[i];	
 
			
		}	

 
		
	}	
	



    //     0 ispartner 1 isunstake 2  stakeNum  3 startTime  4 award  5 inviteNum  6  inviteNumIDO 7 isIDO 8 canClaim 9 jifen  10 index 11 claimedTotal 12 baseClaim 13 stakeNFT  ID(amount) 14 nftTime  15 NFTrate 16 stakeLPNum 17 LPtime
    
    function stakeNft(uint256 amount) public payable {
		
		require(data[_msgSender()][13]==0, "only limit once "); 
		
        IERC20(_NFT).transferFrom(_msgSender(), address(this), amount);
		
        data[_msgSender()][13] += amount; // 2  stakeNum
        //data[_msgSender()][8] = 0; //8 canclaim

		if(amount>levelNFT3) { data[_msgSender()][15] = NFT4rate; }	
		
		if(amount<=levelNFT1) { data[_msgSender()][15] = NFT1rate; }

		if(amount>levelNFT1 && amount<=levelNFT2) { data[_msgSender()][15] = NFT2rate; }		

		if(amount>levelNFT2 && amount<=levelNFT3) { data[_msgSender()][15] = NFT3rate; }	
		

    }	


    function unstakeNft() public nonReentrant payable  {


		require(data[_msgSender()][13]>0, "no satke "); 
        IERC20(_NFT).transfer(_msgSender(), data[_msgSender()][13]);			
		data[_msgSender()][13] = 0; //13 stakeNFT  ID(amount)
		data[_msgSender()][15] = 0; //15 NFTrate

	}	


    // function doAwardNft(address invite) public nonReentrant payable {
        // require(data[_msgSender()][3] + durations < block.timestamp);
		// require(data[_msgSender()][13]>0, "no satke ");  
        
        // IERC20 coin = IERC20(_BONUS);

        // uint256 award = data[_msgSender()][2] * coin.balanceOf(address(this)) / stakes;
        // coin.transfer(_msgSender(), award);
        
 
        // data[_msgSender()][14] =  block.timestamp;
    // }
	
//==============================================================

    function stakeLP(uint256 amount) public payable {
		
        IERC20(_BDSLP).transferFrom(_msgSender(), address(this), amount);
		
        data[_msgSender()][2] += amount; // 2  stakeNum
        //data[_msgSender()][8] = 0; //8 canclaim
        data[_msgSender()][3] =  block.timestamp;	//3 startTime	
        stakesLP += amount;
    }

    function unstakeLP() public nonReentrant payable  {


		require(data[_msgSender()][13]>0, "no satke "); 
        IERC20(_BDSLP).transfer(_msgSender(), data[_msgSender()][13]);			
		data[_msgSender()][13] = 0; //13 stakeNFT  ID(amount)
		data[_msgSender()][15] = 0; //15 NFTrate

	}	
	
	
    function doAwardLP(address invite) public nonReentrant payable {
        require(data[_msgSender()][3] + durations < block.timestamp);
 
        
        IERC20 coin = IERC20(_BDSLP);

        uint256 award = data[_msgSender()][2] * coin.balanceOf(address(this)) / stakes * (100+data[_msgSender()][15])/100;
        coin.transfer(_msgSender(), award);
        
 
        data[_msgSender()][3] =  block.timestamp;
    }	
	
//==============================================================
	


    //     0 ispartner 1 isunstake 2  stakeNum  3 startTime  4 award  5 inviteNum  6  inviteNumIDO 7 isIDO 8 canClaim 9 jifen  10 index 11 claimedTotal 12 baseClaim
    
    function stake2(uint256 amount) public payable {
		
        IERC20(_BDS).transferFrom(_msgSender(), address(this), amount);
		
        data[_msgSender()][2] += amount; // 2  stakeNum
        //data[_msgSender()][8] = 0; //8 canclaim
        data[_msgSender()][3] =  block.timestamp;	//3 startTime	
        stakes += amount;
    }
	


	

    function unstake() public nonReentrant payable  {
		
        require(data[_msgSender()][3] + (durations * 1) < block.timestamp);
		
		if(data[_msgSender()][8]-data[_msgSender()][11]>=data[_msgSender()][2]){
		
		uint256 transferAmount = data[_msgSender()][2].mul(2);
		
		data[_msgSender()][11] += data[_msgSender()][2] ;
		
        IERC20(_BDS).transfer(_msgSender(), transferAmount);
		
		}
		else if(data[_msgSender()][8]-data[_msgSender()][11]>0 && data[_msgSender()][8]-data[_msgSender()][11]< data[_msgSender()][2] ){
			
		uint256 transferAmount1 = data[_msgSender()][2] + data[_msgSender()][8]-data[_msgSender()][11];
		
		data[_msgSender()][11] += data[_msgSender()][8]-data[_msgSender()][11] ;
		
        IERC20(_BDS).transfer(_msgSender(), transferAmount1);
		
			
		}
		else{

        IERC20(_BDS).transfer(_msgSender(), data[_msgSender()][2]);			
			
		}
		
		
        stakes -= data[_msgSender()][2];
        data[_msgSender()][2] = 0;
		
		
		
    }


    function doAward(address invite) public nonReentrant payable {
        require(data[_msgSender()][3] + durations < block.timestamp);
        require(data[_msgSender()][2] >= minhold);
        
        IERC20 coin = IERC20(_BONUS);

        uint256 award = data[_msgSender()][2] * coin.balanceOf(address(this)) / stakes * (100+data[_msgSender()][15])/100;
        coin.transfer(_msgSender(), award);
        
        data[_msgSender()][4] += award;
        data[_msgSender()][3] =  block.timestamp;
    }
	


     function getAward() public view returns (uint256) {

        IERC20 coin = IERC20(_BONUS);

        uint256 Award = data[_msgSender()][2] * coin.balanceOf(address(this)) / stakes * (100+data[_msgSender()][15])/100;
        return Award;


    }	
	
	
	//usdt
    // function doAward() public {
        // require(data[_msgSender()][3] + durations < block.timestamp);
        // require(data[_msgSender()][7] >= minhold);
        
        // IERC20 coin = IERC20(_USDT);

        // uint256 award = data[_msgSender()][7] * coin.balanceOf(address(this)) / stakes;
        // coin.transfer(_msgSender(), award);
        
        // data[_msgSender()][4] += award;
        // data[_msgSender()][3] =  block.timestamp;
    // }





 
    function doPartner(address invite) public payable {

        // IERC20(_BDSLP).transferFrom(_msgSender(), address(this), amount);
        // data[_msgSender()][7] += amount;
        // data[_msgSender()][8] = 0;
        uint256 amount = msg.value;

        require(amount >= ethPartner ,"ERROR Insufficient payment");    

        require(block.timestamp >= sttime && block.timestamp < edtime  ,"ERROR Out of time");                

        if (boss[_msgSender()] == address(0) && _msgSender() != invite && invite != address(0)) {
            boss[_msgSender()] = invite;
            team1[invite].push(_msgSender());
            
            address invite2 = boss[invite];
            if (invite2 != address(0)) {
                team2[invite2].push(_msgSender());
            }
        }

        data[_msgSender()][0] = 1;
        data[_msgSender()][1] = 0;
        data[_msgSender()][2] = amount;
        data[_msgSender()][3] = block.timestamp; //startTime
        data[invite][5] += 1; // inviteNum + 1   partner  inviteNum
        data[invite][6] += 1; // inviteNumIDO + 1   inviteNumIDO 
        data[_msgSender()][8] = claimPartner; //CANCLAIM

        if(PartnerRef>0){

        //ref
        if(data[invite][0]==1){
        payable(invite).transfer(amount * PartnerRef /100 );
        }else{

        payable(_backAddr).transfer(amount * PartnerRef /100 );

        }

        }



        //vip
        partnersVIP[address(this)].push(_msgSender());


        partner[_msgSender()] = true;
        partners+=1;
        stakes += amount;

    }
	
	

    
}



// 10000000000000000     16 0

// ["8","1652323918","1653187918","1652323918","1653187918","0","0","1652323918"]

// ["10000000000000000","20000000000000000","10000000000000000","20000000000000000"]

