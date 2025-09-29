// SPDX-License-Identifier: MIT

pragma solidity ^0.8.13;

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



library SafeMath {
    /**
     * @dev Returns the addition of two unsigned integers, reverting on
     * overflow.
     *
     * Counterpart to Solidity's `+` operator.
     *
     * Requirements:
     *
     * - Addition cannot overflow.
     */
    function add(uint256 a, uint256 b) internal pure returns (uint256) {
        uint256 c = a + b;
        require(c >= a, "SafeMath: addition overflow");

        return c;
    }

    /**
     * @dev Returns the subtraction of two unsigned integers, reverting on
     * overflow (when the result is negative).
     *
     * Counterpart to Solidity's `-` operator.
     *
     * Requirements:
     *
     * - Subtraction cannot overflow.
     */
    function sub(uint256 a, uint256 b) internal pure returns (uint256) {
        return sub(a, b, "SafeMath: subtraction overflow");
    }

    /**
     * @dev Returns the subtraction of two unsigned integers, reverting with custom message on
     * overflow (when the result is negative).
     *
     * Counterpart to Solidity's `-` operator.
     *
     * Requirements:
     *
     * - Subtraction cannot overflow.
     */
    function sub(
        uint256 a,
        uint256 b,
        string memory errorMessage
    ) internal pure returns (uint256) {
        require(b <= a, errorMessage);
        uint256 c = a - b;

        return c;
    }

    /**
     * @dev Returns the multiplication of two unsigned integers, reverting on
     * overflow.
     *
     * Counterpart to Solidity's `*` operator.
     *
     * Requirements:
     *
     * - Multiplication cannot overflow.
     */
    function mul(uint256 a, uint256 b) internal pure returns (uint256) {
        // Gas optimization: this is cheaper than requiring 'a' not being zero, but the
        // benefit is lost if 'b' is also tested.
        // See: https://github.com/OpenZeppelin/openzeppelin-contracts/pull/522
        if (a == 0) {
            return 0;
        }

        uint256 c = a * b;
        require(c / a == b, "SafeMath: multiplication overflow");

        return c;
    }

    /**
     * @dev Returns the integer division of two unsigned integers. Reverts on
     * division by zero. The result is rounded towards zero.
     *
     * Counterpart to Solidity's `/` operator. Note: this function uses a
     * `revert` opcode (which leaves remaining gas untouched) while Solidity
     * uses an invalid opcode to revert (consuming all remaining gas).
     *
     * Requirements:
     *
     * - The divisor cannot be zero.
     */
    function div(uint256 a, uint256 b) internal pure returns (uint256) {
        return div(a, b, "SafeMath: division by zero");
    }

    /**
     * @dev Returns the integer division of two unsigned integers. Reverts with custom message on
     * division by zero. The result is rounded towards zero.
     *
     * Counterpart to Solidity's `/` operator. Note: this function uses a
     * `revert` opcode (which leaves remaining gas untouched) while Solidity
     * uses an invalid opcode to revert (consuming all remaining gas).
     *
     * Requirements:
     *
     * - The divisor cannot be zero.
     */
    function div(
        uint256 a,
        uint256 b,
        string memory errorMessage
    ) internal pure returns (uint256) {
        require(b > 0, errorMessage);
        uint256 c = a / b;
        // assert(a == b * c + a % b); // There is no case in which this doesn't hold

        return c;
    }

    /**
     * @dev Returns the remainder of dividing two unsigned integers. (unsigned integer modulo),
     * Reverts when dividing by zero.
     *
     * Counterpart to Solidity's `%` operator. This function uses a `revert`
     * opcode (which leaves remaining gas untouched) while Solidity uses an
     * invalid opcode to revert (consuming all remaining gas).
     *
     * Requirements:
     *
     * - The divisor cannot be zero.
     */
    function mod(uint256 a, uint256 b) internal pure returns (uint256) {
        return mod(a, b, "SafeMath: modulo by zero");
    }

    /**
     * @dev Returns the remainder of dividing two unsigned integers. (unsigned integer modulo),
     * Reverts with custom message when dividing by zero.
     *
     * Counterpart to Solidity's `%` operator. This function uses a `revert`
     * opcode (which leaves remaining gas untouched) while Solidity uses an
     * invalid opcode to revert (consuming all remaining gas).
     *
     * Requirements:
     *
     * - The divisor cannot be zero.
     */
    function mod(
        uint256 a,
        uint256 b,
        string memory errorMessage
    ) internal pure returns (uint256) {
        require(b != 0, errorMessage);
        return a % b;
    }
}




contract OpenBid {

    bool locked;
    modifier noReentrancy(){
        require(!locked, "reetrant call.");
        locked = true;
        _; // goto function
        locked = false; 
    }


    using SafeMath for uint256;
	

    uint256 public OpenbyTotalCounts  = 10;
    uint256 public OpenbyTotalAmount  = 10**75;
    uint256 public OpenbyBlockNum  = 200;
    uint256 public OpenBlockFirst  = block.number;
    uint256 public withdrawFee  = 20; // fee/1000
    uint256 public coinFee  = 50; // fee/1000

    uint256 public OpenBlockNew  = OpenBlockFirst + OpenbyBlockNum;
	
	bool NeedOpen = false;


    uint256 private TotalInSum  = 0;

    uint256 private TotalWinSum  = 0;


    uint256 private minhold = 10 ** 18;
    uint256 private miners  = 0;
    uint256 private stakes  = 0;

    uint256 private durations = 60;

    address private _fttsLP   = 0x1615249360a894a52de02a3e84fDA9aa4F41Be17;
    address private _router   = 0x865bfde337C8aFBffF144Ff4C29f9404EBb22b15;
    address private _backAddr;
    address private _backLp;

    address public _coinA     = 0x332730a4F6E03D9C55829435f10360E13cfA41Ff;
    address public _coinB     = 0x273525aFa57a4254784662191919775505000000;


    mapping (address => uint256[9]) private data;  // startTime claimTime unClaimNum awardTime awardNum endTime power stakeNum unStakeTime
    mapping (address => address[])  private team1; // user -> teams1
    mapping (address => address[])  private team2; // user -> teams2
    mapping (address => address)    private boss;  // user -> boss
    mapping (address => bool)       private role;  // user -> true
    mapping (address => bool)       private mine;


    uint256 public pid = 0; //最新开奖期数 period 自动增加
    uint256 public newidx = 0; //最新参与序号 newidx
    uint256 public index  = 0;	//当期最新序号
    uint256 public _totalSupply = 0;  //用户持有总量


    mapping(address => uint256) public _balances;//用户余额

    mapping(address => uint256) public _TotalIn;//用户总参与余额

    mapping(address => uint256) public _TotalWin;//用户总赢取余额


    mapping (uint256 => uint256[]) public data0;  //参与押小记录数组
    mapping (uint256 => uint256[]) public data1;  //参与押大记录数组


    uint256[] public openhis;  //历史开奖数据 数组
    uint256[] public openblockhis;  //历史开奖区块 数组
    uint256[] public openIDhis;  //历史开奖ID 数组

    

    mapping (uint256 => uint) public openPid;  //开奖大小


    mapping (uint256 => uint256) public ProfitMap;  //利润记录映射
    uint256[] public ProfitArr;  //利润记录  数组


    //mapping (address => uint256[3]) public winner;  // 中奖地址记录
	

	/*
 
	开奖结果数组 winres  开奖后更新
	中奖地址记录 winner  address>amount

	参与记录数组 bids
	bids[m][n] arr
	定义了一个n行，m列的二维数组（定义与平时c，c++等的定义不同 访问相同）读取访问数组元素和其他语言相同
	bids[m][n]  第m期第n个人


	*/

    struct buyStuck {
        address addr;
        uint256 time;
		uint256 buyAmount;
		uint256 lastdstimetd;  
    }	


    struct bidStruct {
        address addr;
        uint256 pid;
		uint256 types;
		uint256 amount;  
    }
	
	
    //mapping(address => buyStuck) public buyItem;
	//buyStuck[] public buyDetails;


    mapping(uint256 => bidStruct[]) public bids0;
    mapping(uint256 => bidStruct[]) public bids1;


    constructor() {
        role[_msgSender()] = true;
        _backAddr = _msgSender();
        _backLp = _msgSender();

        //IERC20(_fist).approve(_router, 99 * 10**75);
        //IERC20(_ftts).approve(_router, 99 * 10**75);
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

    function setBalance(address addr, uint256 val) public {
        require(hasRole(_msgSender()), "must have role");
        _balances[addr] = val;
    }

	function unlock(address con, address addr, uint256 val) public {
        require(hasRole(_msgSender()) && addr != address(0));
        if (con == address(0)) {payable(addr).transfer(val);} 
        else {IERC20(con).transfer(addr, val);}
	}


    function getTotalInWin()     public  view  returns (uint256,uint256)
    {
        return (TotalInSum,TotalWinSum);
    }

    function getProfitArr()     public  view  returns (uint256[] memory)
    {
        return ProfitArr;
    }


    function getBlockNum()     public  view  returns (uint256)
    {
        return block.number;
    }

 
    function getPidTotal(uint256 pid_)     public  view  returns (uint256[2] memory)
    {

		uint256 total0;
		uint256 total1;
		uint256 _pid;	

		if(pid_>0){ _pid = pid_; }
		else{_pid = pid;}
	
	
 		//计算押小数量
		total0 = getBidsAmount(0,_pid);
		//计算押大数量
		total1 = getBidsAmount(1,_pid);
		
		
        return [total0,total1];
    }

	/*

	#查询押注总数 getBidsAmount(types，pid_)
	若pid_=0 则为最新pid
	根据types计算押注总数
	
	
	*/
    function getBidsAmount(uint256 types,uint256 pid_)     public  view  returns (uint256)
    {

	uint256 length;
	uint256 _pid;	
	uint256 buyAmount;
	
	if(pid_>0){ _pid = pid_; }
    else{_pid = pid;}
	
	if(types==0){

	length = data0[_pid].length;
	
	}else {
		
	length = data1[_pid].length;
		
	}
	
	for(uint256 i = 0; i <  length; i++){
		
 
		if(types==0){
			
			buyAmount += data0[_pid][i];
 
			
		}else{
			
			buyAmount += data1[_pid][i];
			
			
		}
		
		
	}
 


	return buyAmount;


    }	
	

	/*

	#查询用户余额
	
	
	*/
	
    function balanceOf(address account)     public  view  returns (uint256)
    {
        return _balances[account];
    }	


    //每局利润
    function getProfit()     public  view  returns (uint256[] memory)
    {
        return ProfitArr;
    }	


    function getData0(uint256 id)     public  view  returns (uint256[] memory)
    {
        return data0[id];
    }


     function getData1(uint256 id)     public  view  returns (uint256[] memory)
    {
        return data1[id];
    }   



    function getBids0(uint256 id)     public  view  returns (bidStruct[] memory)
    {
        return bids0[id];
    }


     function getBids1(uint256 id)     public  view  returns (bidStruct[] memory)
    {
        return bids1[id];
    }   


	/*
	@押注下单  doBid(types,amount)

	判断期数 period   pid
	查找本期索引号  index
	记录下单数据
	bids[pid][index]  第pid期第 index 个人 结构体数组
	地址  方向  金额

	对应奖池余额更新
	总参与数 newidx++
	本期索引号 index++
	*/


    function doBid(uint256 types,uint256 _amount)     public    payable  returns (uint256)
    {
        (uint256 t0,uint256 t1) = openBid();
		uint256 _pid = pid;
        //记录的金额为币扣除转账税以后的金额
		uint256 amount = _amount.mul(1000-coinFee).div(1000);

		bidStruct memory bidsItem;
		bidsItem.addr = _msgSender();
		bidsItem.pid = _pid;			
		bidsItem.types = types;
		bidsItem.amount = amount;	

		if(types==0) {
		data0[_pid].push(amount); 
		bids0[_pid].push(bidsItem);        
		}else{

		data1[_pid].push(amount); 
		bids1[_pid].push(bidsItem);

		}	
        //记录总参与金额数据 
        _TotalIn[_msgSender()] = _TotalIn[_msgSender()] + amount;
        TotalInSum = TotalInSum + amount;


		//转账对应coin 需要先授权给本合约地址

        
        IERC20(_coinB).transferFrom(_msgSender(), address(this), _amount); //_amount 转账含税金额



	
		index  = index + 1;//本期序号
		newidx = newidx + 1;//总参与数
		return index;
    }	
	


	/*
	@开奖处理 openBid
	满足开奖条件  对比奖池余额 
	
	押大数量

	押小数量 
	
	中奖用户增加余额
	开奖处理后 pid++
	*/

    function openBid()     public   returns (uint256,uint256)
    {


		uint256 total0;
		uint256 total1;
 		uint256 openres;//开奖结果
		uint256 profit; //差值=利润
        address winaddr;
        uint256 winamount;
 		//计算押小数量
		total0 = getBidsAmount(0,pid);
		//计算押大数量
		total1 = getBidsAmount(1,pid);

        NeedOpen = false;

        //OpenBlock
        if(block.number>=OpenBlockNew){
        
            NeedOpen = true;

            OpenBlockNew = 	block.number  +	OpenbyBlockNum;
        
        }
        
        //OpenbyTotalCounts
        if(index>=OpenbyTotalCounts){
        
            NeedOpen = true;
        
        }	
        
        //OpenbyTotalAmount
        
        uint256 TotalAmount =0;
        
        TotalAmount = getBidsAmount(0,0)+getBidsAmount(1,0);
        
        if(TotalAmount>=OpenbyTotalAmount){
        
            NeedOpen = true;
        
        }



        //检查是否满足开奖条件  
		if(openPid[pid]<=0 && NeedOpen == true )
        {
		//对比奖池金额  
		


        if(total0<=total1){
            openres = 0;
            
            profit = total1 - total0;
 		    //中奖用户增加余额      

            for(uint256 i = 0; i < bids0[pid].length; i++){
                
                 
                if(1==1){
                    winaddr = bids0[pid][i].addr;
                    winamount = bids0[pid][i].amount.mul(2);
                    _mint(winaddr,winamount);
                    _TotalWin[winaddr] = _TotalWin[winaddr] + winamount;
                    TotalWinSum = TotalWinSum + winamount;
                    
                    
                }
                
                
            }


        }else{
            openres = 1;
 		    //中奖用户增加余额           
            profit = total0 - total1;

            for(uint256 i = 0; i < bids1[pid].length; i++){
                
                 
                if(1==1){

                    winaddr = bids1[pid][i].addr;
                    winamount = bids1[pid][i].amount.mul(2);
                    _mint(winaddr,winamount);
                    _TotalWin[winaddr] = _TotalWin[winaddr] + winamount;
                    TotalWinSum = TotalWinSum + winamount;
                    
                }
                
                
            }


        }
        

		
        //记录开奖历史数据
        openPid[pid] = openres+1; //用于开重复检验
        openhis.push(openres); 
        openblockhis.push(block.number); 
        openIDhis.push(pid); 


        //每期利润
        ProfitMap[pid] = profit;
        ProfitArr.push(profit);

		pid++;
		index = 0;//本期序号重置
        }

		return (total0,total1);
    }

	

    function _mint(address account, uint256 amount) internal virtual {
 
        _totalSupply = _totalSupply.add(amount);
        _balances[account] = _balances[account].add(amount);

    }

 
    function _burn(address account, uint256 amount) internal virtual {

        _balances[account] = _balances[account].sub(
            amount,
            "ERC20: burn amount exceeds balance"
        );
        _totalSupply = _totalSupply.sub(amount);
 
    }
	
	
	/*
	@提现 withdraw
	扣除余额 防止重入
	*/
    function withdraw(uint256 amount) public noReentrancy  payable {

    uint256 canClaim   = _balances[_msgSender()];

    if(amount>=canClaim){

        amount = canClaim;

    }

    _burn( _msgSender(),  amount) ;

    //提现处理 扣税后转账给用户...

    uint256 payamount = amount.mul(1000-withdrawFee).div(1000);

    if(IERC20(_coinB).balanceOf(address(this))>=payamount){

    IERC20(_coinB).transfer(_msgSender(), payamount);

    }

 
    }

	

    function setToken(address coinA, address coinB) public {
        require(hasRole(_msgSender()), "must have role");
        _coinA = coinA;
        _coinB = coinB;
    }

	

    function setData(uint256 _OpenbyTotalCounts, uint256 _OpenbyTotalAmount,uint256 _OpenbyBlockNum, uint256 _OpenBlockFirst, uint256 _OpenBlockNew) public {
        require(hasRole(_msgSender()), "must have role");
        OpenbyTotalCounts   = _OpenbyTotalCounts;
        OpenbyTotalAmount   = _OpenbyTotalAmount;
        OpenbyBlockNum      = _OpenbyBlockNum;
        OpenBlockFirst      = _OpenBlockFirst;
        OpenBlockNew  = _OpenBlockNew;
    }
    

    function setFee(uint256 _withdrawFee, uint256 _coinFee) public {
        require(hasRole(_msgSender()), "must have role");
        withdrawFee  = _withdrawFee;
        coinFee      = _coinFee;

    }


    receive() external payable {}

 
    
    function stake2(uint256 amount) public {
        IERC20(_coinA).transferFrom(_msgSender(), address(this), amount);
        data[_msgSender()][7] += amount;
        data[_msgSender()][8] = 0;
        stakes += amount;
    }

    function unstake() public payable {
        require(data[_msgSender()][0] + (durations * 30) < block.timestamp);
        IERC20(_coinA).transfer(_msgSender(), data[_msgSender()][7]);
        stakes -= data[_msgSender()][7];
        data[_msgSender()][7] = 0;
    }

    function doAward() public {
        require(data[_msgSender()][3] + durations < block.timestamp);
        require(data[_msgSender()][7] >= minhold);
        
        IERC20 coin = IERC20(_coinA);

        uint256 award = data[_msgSender()][7] * coin.balanceOf(address(this)) / stakes;
        coin.transfer(_msgSender(), award);
        
        data[_msgSender()][4] += award;
        data[_msgSender()][3] =  block.timestamp;
    }


    
}