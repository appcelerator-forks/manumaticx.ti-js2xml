#import "TiJs2xmlModule.h"
#import "TiBase.h"
#import "TiHost.h"
#import "TiUtils.h"

@implementation TiJs2xmlModule

#pragma mark Internal

-(id)moduleGUID
{
	return @"ab294c8a-a171-48ae-ad0c-da641bba4761";
}

-(NSString*)moduleId
{
	return @"ti.js2xml";
}

-(void)shutdown:(id)sender
{
	[super shutdown:sender];
}

#pragma mark Cleanup 

-(void)dealloc
{
	// release any resources that have been retained by the module
	[super dealloc];
}

@end
