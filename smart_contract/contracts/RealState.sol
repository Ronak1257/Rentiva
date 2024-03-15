// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract RealState{
    //state variables
    struct Property{
        uint256 productID;
        address owner;
        address tenant;
        uint256 price;
        uint256 startTime;
        uint256 leaseTime;
        string propertyTitle;
        string images;
        string propertyAddress;
        string description;
        bool list;
        bool lease;
    }

    //mapping
    mapping(uint256=> Property) private properties;
    uint256 public propertyIndex;

    //events
    event PropertyCreated(uint256 indexed id,address indexed owner);
    event PropertyLeased(uint256 indexed id,address indexed owner,address indexed tenant,uint256 price,uint256 leaseTime);
    event PropertyReleased(uint256 indexed id,address indexed owner,address indexed tenant,uint256 price);

    //function 
    function createProperty(address owner, string memory _propertyTitle,string memory _images,string memory _proprertyAddress,string memory _description) external returns(uint256){
        uint256 productId=propertyIndex++;
        Property storage property=properties[productId];
        property.productID=productId;
        property.owner=owner;
        property.propertyTitle=_propertyTitle;
        property.images=_images;
        property.propertyAddress=_proprertyAddress;
        property.description=_description;

        emit PropertyCreated(productId,owner);
        return productId;
    }

    function listProperty(address owner,uint256 productId,uint256 _price,uint256 _time) external returns(uint256){
        Property storage property=properties[productId];
        require(owner==property.owner,"Only owner can List the property.");
        require(_price>0,"Price must be greter than 0.");
        require(_time>0,"Time can't be 0.");
        property.price=_price;
        property.leaseTime=_time;
        property.list=true;
        return productId;
    }

    function leaseProperty(uint256 productId,address _tenant)external payable{
        uint256 amount=msg.value;
        Property storage property=properties[productId];
        require(property.list==true,"This property is not listed yet.");
        require(amount>=property.price,"Please pay the exact amount.");
        require(property.leaseTime>0,"Time can't be 0.");
        require(_tenant!=property.owner,"Owner can't lease their own property.");
        property.tenant=_tenant;
        property.startTime=block.timestamp;
        property.lease=true;
        emit PropertyLeased(productId,property.owner,_tenant,amount,property.leaseTime);
    }

    function releaseProperty(uint256 productId,address owner) external returns(uint256){
        Property storage property=properties[productId];
        uint256 currentTime=block.timestamp;
        uint256 propertyTime=property.startTime+property.leaseTime;
        require(property.owner==owner,"Only owner can release Property");
        require(currentTime>=propertyTime,"Lease Time is not completed wait until it completed");
        payable(owner).transfer(property.price);
        emit PropertyReleased(productId,owner,property.tenant,property.price);
        property.price=0;
        property.leaseTime=0;
        property.startTime=0;
        property.list=false;
        property.lease=false;
        return productId;

    }

    function getProperty(uint256 propertyId) external view returns(Property memory){
        Property memory property=properties[propertyId];
        return property;
    }

    function getUserProperties(address user) external view returns(Property[] memory){
        uint256 totalItemCount=propertyIndex;
        uint256 itemCount=0;
        uint256 currentIndex=0;

        for(uint256 i=0;i<totalItemCount;i++){
            if(properties[i].owner==user){
                itemCount++;
            }
        }
        Property[] memory items=new Property[](itemCount);
        for(uint256 i=0;i<totalItemCount;i++){
            if(properties[i].owner==user){
                Property storage currentItem=properties[i];
                items[currentIndex]=currentItem;
                currentIndex++;
            }
        }
        return items;
    }

    function getListedProperty() public view returns(Property[] memory){
        uint256 totalItemCount=propertyIndex;
        uint256 itemCount=0;
        uint256 currentIndex=0;
        for(uint256 i=0;i<totalItemCount;i++){
            if(properties[i].list==true){
                itemCount++;
            }
        }
        Property[] memory items=new Property[](itemCount);
        for(uint256 i=0;i<totalItemCount;i++){
            if(properties[i].list==true){
                Property storage currentItem=properties[i];
                items[currentIndex]=currentItem;
                currentIndex++;
            }
        }
        return items;
    }
}