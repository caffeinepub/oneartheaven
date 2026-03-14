import Map "mo:core/Map";
import UserApproval "user-approval/approval";
import AccessControl "authorization/access-control";

module {
  public type OldActor = {
    accessControlState : AccessControl.AccessControlState;
    userProfiles : Map.Map<Principal, UserProfile>;
    nextMemberId : Nat;
  };

  public type UserProfile = {
    name : Text;
  };

  public type NewActor = {
    accessControlState : AccessControl.AccessControlState;
    approvalState : UserApproval.UserApprovalState;
    userProfiles : Map.Map<Principal, UserProfile>;
    nextMemberId : Nat;
  };

  public func run(old : OldActor) : NewActor {
    let approvalState = UserApproval.initState(old.accessControlState);
    {
      old with
      approvalState = approvalState;
    };
  };
};
