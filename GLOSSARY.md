# Freedom in Christ Church

The church's public website plus the signed-in tools its members and leaders use: the blog, the prayer schedule and the worship team.

## Access

**Viewer**:
The person making a request, together with everything they may do on it: their Roles, whether they are a Worship member, and whether they are a Blog author. A signed-out visitor is a Viewer with no permissions.
_Avoid_: user (when permissions are meant), session, current user

**Superuser**:
A Viewer flagged as an administrator of the whole site. A Superuser implicitly holds every Role and passes every access check.
_Avoid_: admin (the `/admin` pages are also used by leaders who are not Superusers)

**Role**:
A leadership responsibility granted to a Viewer by a Superuser: Prayer leader or Worship leader.
_Avoid_: permission, group

**Prayer leader**:
A Role whose holder sets the prayer meeting schedule.

**Worship leader**:
A Role whose holder runs the worship schedule, sees song usage and adds songs. Every Worship leader is also a Worship member.

**Worship member**:
A Viewer who may see team-only worship pages (schedule, availability, chords): anyone with an approved Worship team request, plus every Worship leader and Superuser.
_Avoid_: worship team (on its own), team member

**Worship team request**:
A Viewer's application to join the worship team, which a Superuser approves or rejects.

**Blog author**:
A Viewer whose request to write for the blog has been approved.
_Avoid_: writer, contributor
