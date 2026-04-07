import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Array "mo:core/Array";
import AccessControl "./AccessControl";

module {
  public type ApprovalStatus = {
    #approved;
    #rejected;
    #pending;
  };

  // Field names must match old stable state shape:
  // { var approvalStatus : Map<Principal, ApprovalStatus> }
  public type UserApprovalState = {
    var approvalStatus : Map.Map<Principal, ApprovalStatus>;
  };

  public type UserApprovalInfo = {
    principal : Principal;
    status : ApprovalStatus;
  };

  public func initState(_accessControlState : AccessControl.AccessControlState) : UserApprovalState {
    { var approvalStatus = Map.empty<Principal, ApprovalStatus>() };
  };

  public func isApproved(state : UserApprovalState, caller : Principal) : Bool {
    switch (state.approvalStatus.get(caller)) {
      case (?(#approved)) true;
      case _ false;
    };
  };

  public func requestApproval(state : UserApprovalState, caller : Principal) {
    switch (state.approvalStatus.get(caller)) {
      case null { state.approvalStatus.add(caller, #pending) };
      case _ {};
    };
  };

  public func setApproval(state : UserApprovalState, user : Principal, approval : ApprovalStatus) {
    state.approvalStatus.add(user, approval);
  };

  public func listApprovals(state : UserApprovalState) : [UserApprovalInfo] {
    state.approvalStatus.entries().toArray()
      |> _.map(func((p, s) : (Principal, ApprovalStatus)) : UserApprovalInfo {
        { principal = p; status = s };
      });
  };
};
