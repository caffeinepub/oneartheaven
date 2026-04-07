import Map "mo:core/Map";
import Principal "mo:core/Principal";

module {
  public type UserRole = {
    #admin;
    #user;
    #guest;
  };

  // Field names must match the old stable state shape:
  // { var adminAssigned : Bool; userRoles : Map<Principal, UserRole> }
  public type AccessControlState = {
    var adminAssigned : Bool;
    userRoles : Map.Map<Principal, UserRole>;
  };

  public func initState() : AccessControlState {
    {
      var adminAssigned = false;
      userRoles = Map.empty<Principal, UserRole>();
    };
  };

  public func getUserRole(state : AccessControlState, caller : Principal) : UserRole {
    switch (state.userRoles.get(caller)) {
      case (?role) role;
      case null {
        if (caller.isAnonymous()) #guest else #user;
      };
    };
  };

  public func assignRole(state : AccessControlState, _caller : Principal, user : Principal, role : UserRole) {
    state.userRoles.add(user, role);
  };

  public func isAdmin(state : AccessControlState, caller : Principal) : Bool {
    switch (state.userRoles.get(caller)) {
      case (?(#admin)) true;
      case _ false;
    };
  };

  public func hasPermission(state : AccessControlState, caller : Principal, requiredRole : UserRole) : Bool {
    let role = getUserRole(state, caller);
    switch (requiredRole) {
      case (#guest) true;
      case (#user) {
        switch (role) {
          case (#user or #admin) true;
          case _ false;
        };
      };
      case (#admin) {
        switch (role) {
          case (#admin) true;
          case _ false;
        };
      };
    };
  };

  // Auto-promote the first authenticated caller to admin
  public func ensureFirstAdmin(state : AccessControlState, caller : Principal) {
    if (not state.adminAssigned and not caller.isAnonymous()) {
      state.userRoles.add(caller, #admin);
      state.adminAssigned := true;
    };
  };
};
